<template>
    <section class="hero">
        <div class="hero-inner">
            <p class="system-label">[ QUANTUM PROTOCOL v9.1 — INITIALIZED ]</p>
            <h1 class="quantum-title" ref="quantumTitleEl">QUANTUM SUDOKU</h1>
            <p class="hero-sub">
                Reality is not what it seems.<br />
                Neither is this puzzle.
            </p>
            <div class="hero-buttons">
                <NuxtLink to="/game" class="sci-btn sci-btn--primary">
                    <span class="sci-btn__bracket">[</span>
                    <span>▶&nbsp;INITIATE GAME</span>
                    <span class="sci-btn__bracket">]</span>
                </NuxtLink>
                <button class="sci-btn sci-btn--secondary">
                    <span class="sci-btn__bracket">[</span>
                    <span>⊕&nbsp;TUTORIAL</span>
                    <span class="sci-btn__bracket">]</span>
                </button>
            </div>
        </div>
        <div class="scroll-hint">
            <span class="scroll-hint__text">SCROLL TO EXPLORE</span>
            <span class="scroll-hint__arrow">▼</span>
        </div>
    </section>
</template>

<script setup>
const quantumTitleEl = ref(null);
const BASE_TEXT = "QUANTUM SUDOKU";
const POOL = "01ψΦΩ∞⟨⟩†⊗⊕∑∫√≠≈◈◉▲△░▒▓";

let glitchInterval = null;

const glitch = () => {
    const el = quantumTitleEl.value;
    if (!el) return;
    const scrambled = [...BASE_TEXT]
        .map((c) =>
            c !== " " && Math.random() < 0.35
                ? POOL[Math.floor(Math.random() * POOL.length)]
                : c
        )
        .join("");
    el.textContent = scrambled;
    setTimeout(() => {
        if (el) el.textContent = BASE_TEXT;
    }, 120);
};

onMounted(() => {
    glitch();
    setTimeout(glitch, 300);
    glitchInterval = setInterval(glitch, 2800);
});
onUnmounted(() => clearInterval(glitchInterval));
</script>

<style scoped>
.hero {
    position: relative;
    height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 2rem 6rem;
}

.hero-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    max-width: 700px;
}

/* ── System label ───────────────────────────────────────── */
.system-label {
    font-family: "Courier New", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    opacity: 0.5;
    text-transform: uppercase;
    animation: blink 3s step-end infinite;
}

@keyframes blink {
    0%,
    100% {
        opacity: 0.5;
    }
    50% {
        opacity: 0.2;
    }
}

/* ── Quantum title ──────────────────────────────────────── */
.quantum-title {
    font-family: "Courier New", monospace;
    font-size: clamp(2.4rem, 7vw, 5rem);
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    line-height: 1;
    position: relative;
    animation: titlePulse 4s ease-in-out infinite;
}

html.dark .quantum-title {
    color: var(--text-light);
    text-shadow:
        0 0 8px color-mix(in srgb, var(--primary-color) 80%, transparent),
        0 0 30px color-mix(in srgb, var(--primary-color) 50%, transparent),
        0 0 70px color-mix(in srgb, var(--primary-color) 25%, transparent);
}

html.light .quantum-title {
    color: color-mix(in srgb, var(--primary-color) 90%, black);
    text-shadow:
        0 0 8px color-mix(in srgb, var(--primary-color) 40%, transparent),
        0 0 24px color-mix(in srgb, var(--primary-color) 20%, transparent);
}

@keyframes titlePulse {
    0%,
    100% {
        opacity: 1;
        filter: brightness(1);
    }
    50% {
        opacity: 0.88;
        filter: brightness(1.15);
    }
}

/* ── Subtitle ───────────────────────────────────────────── */
.hero-sub {
    font-family: "Courier New", monospace;
    font-size: 1rem;
    letter-spacing: 0.06em;
    line-height: 1.8;
    opacity: 0.65;
}

/* ── Buttons ────────────────────────────────────────────── */
.hero-buttons {
    display: flex;
    gap: 1.4rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.6rem;
}

.sci-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.8rem 1.8rem;
    font-family: "Courier New", monospace;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    transition:
        filter 0.25s,
        transform 0.2s;
}

.sci-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.25);
}
.sci-btn:active {
    transform: translateY(0);
}

.sci-btn__bracket {
    opacity: 0.55;
    font-weight: 400;
}

.sci-btn--primary {
    background: var(--primary-color);
    color: #fff;
    box-shadow:
        0 0 18px color-mix(in srgb, var(--primary-color) 55%, transparent),
        0 0 40px color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.sci-btn--secondary {
    background: transparent;
    color: var(--primary-color);
    outline: 2px solid color-mix(in srgb, var(--primary-color) 60%, transparent);
    outline-offset: -2px;
}

html.dark .sci-btn--secondary {
    color: var(--text-light);
    outline-color: color-mix(in srgb, var(--text-light) 30%, transparent);
}

/* ── Scroll hint ────────────────────────────────────────── */
.scroll-hint {
    position: absolute;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    opacity: 0.35;
    animation: fadeScroll 2.4s ease-in-out infinite;
}

.scroll-hint__text {
    font-family: "Courier New", monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
}

.scroll-hint__arrow {
    font-size: 0.9rem;
}

@keyframes fadeScroll {
    0%,
    100% {
        opacity: 0.35;
        transform: translateY(0);
    }
    50% {
        opacity: 0.65;
        transform: translateY(5px);
    }
}
</style>
