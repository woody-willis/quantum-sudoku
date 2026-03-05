<template>
    <div class="game-page">
        <!-- Header -->
        <header class="game-header">
            <NuxtLink to="/" class="back-btn">
                <span class="sci-btn__bracket">[</span>
                <span>← BACK</span>
                <span class="sci-btn__bracket">]</span>
            </NuxtLink>
            <div class="game-title-block">
                <p class="game-system-label">
                    [ QUANTUM PROTOCOL v9.1 — ACTIVE ]
                </p>
            </div>
            <div class="game-meta">
                <span class="meta-pill">MOVE 01</span>
                <span class="meta-pill meta-pill--alert">05:43</span>
            </div>
        </header>

        <!-- Board -->
        <main class="game-main">
            <GameSudokuBoard v-if="board.length" :board="board" />
            <div v-else class="board-loading">
                <span class="loading-text">INITIALIZING QUANTUM STATE…</span>
            </div>
        </main>

        <!-- Legend -->
        <footer class="game-legend">
            <div class="legend-item">
                <span class="legend-swatch swatch--fixed" />
                <span>Fixed clue</span>
            </div>
            <div class="legend-item">
                <span class="legend-swatch swatch--superposition" />
                <span>Superposition</span>
            </div>
            <div class="legend-item">
                <span class="legend-swatch swatch--entanglement" />
                <span>Entanglement</span>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
const { board, startGame } = useGameLogic();

onMounted(() => {
    startGame();
});
</script>

<style scoped>
.game-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1rem 1.5rem;
    min-height: calc(100vh - 5rem);
}

/* ── Header ────────────────────────────────────────────────── */
.game-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
    width: 100%;
    max-width: min(92vw, 74vh);
}

.back-btn {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: "Courier New", monospace;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    opacity: 0.55;
    transition: opacity 0.2s;
    color: inherit;
}
.back-btn:hover {
    opacity: 1;
}
.back-btn .sci-btn__bracket {
    opacity: 0.5;
}

.game-system-label {
    font-family: "Courier New", monospace;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    opacity: 0.4;
    text-transform: uppercase;
    margin: 0;
}

.game-meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.meta-pill {
    font-family: "Courier New", monospace;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--primary-color) 40%, transparent);
    color: var(--primary-color);
    opacity: 0.7;
}
.meta-pill--alert {
    border-color: color-mix(in srgb, var(--color-orange) 50%, transparent);
    color: var(--color-orange);
}

/* ── Main ──────────────────────────────────────────────────── */
.game-main {
    width: 100%;
    max-width: min(92vw, 74vh);
    display: flex;
    justify-content: center;
    flex: 1;
}

.board-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
}
.loading-text {
    font-family: "Courier New", monospace;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    opacity: 0.45;
    animation: blink 1.4s step-end infinite;
}
@keyframes blink {
    0%,
    100% {
        opacity: 0.45;
    }
    50% {
        opacity: 0.15;
    }
}

/* ── Legend ────────────────────────────────────────────────── */
.game-legend {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
}
.legend-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-family: "Courier New", monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    opacity: 0.55;
}
.legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    display: inline-block;
    flex-shrink: 0;
}
.swatch--fixed {
    border: 1.5px solid color-mix(in srgb, currentColor 50%, transparent);
    opacity: 0.7;
}
.swatch--superposition {
    border: 1.5px solid var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    box-shadow: 0 0 6px
        color-mix(in srgb, var(--primary-color) 40%, transparent);
}
.swatch--entanglement {
    border: 1.5px solid var(--color-purple);
    background: color-mix(in srgb, var(--color-purple) 15%, transparent);
    box-shadow: 0 0 6px color-mix(in srgb, var(--color-purple) 50%, transparent);
}
</style>
