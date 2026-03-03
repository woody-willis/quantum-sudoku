<template>
    <div class="layout-root" ref="layoutRoot">
        <!-- Cursor glow -->
        <div
            class="cursor-glow"
            :style="{ left: cursor.x + 'px', top: cursor.y + 'px' }"
        />

        <!-- Background pulse rings -->
        <div class="bg-pulse">
            <span class="pulse-ring" />
            <span class="pulse-ring" style="animation-delay: 1.2s" />
            <span class="pulse-ring" style="animation-delay: 2.4s" />
        </div>

        <!-- Scanline overlay -->
        <div class="scanlines" />

        <button class="color-mode-toggle" @click="toggleColorMode">
            <Icon
                v-if="colorMode.value === 'dark'"
                name="uil:sun"
                style="color: var(--text-light)"
                class="icon"
            />
            <Icon
                v-if="colorMode.value === 'light'"
                name="uil:moon"
                style="color: var(--text-dark)"
                class="icon"
            />
        </button>

        <main class="main-content">
            <slot />
        </main>
    </div>
</template>

<script setup>
const colorMode = useColorMode();
const cursor = reactive({ x: -200, y: -200 });

const toggleColorMode = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

onMounted(() => {
    const onMove = (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    onUnmounted(() => window.removeEventListener("mousemove", onMove));
});
</script>

<style scoped>
/* ── Root ──────────────────────────────────────────────── */
.layout-root {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    animation: fadeIn 0.6s ease both;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(6px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ── Cursor glow ───────────────────────────────────────── */
.cursor-glow {
    pointer-events: none;
    position: fixed;
    z-index: 9999;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(
        circle,
        color-mix(in srgb, var(--primary-color) 13%, transparent) 0%,
        color-mix(in srgb, var(--primary-color) 6%, transparent) 40%,
        transparent 70%
    );
    transition:
        left 0.07s ease,
        top 0.07s ease;
    mix-blend-mode: screen;
}

/* ── Background pulse rings ────────────────────────────── */
.bg-pulse {
    pointer-events: none;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
}

.pulse-ring {
    position: absolute;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, var(--primary-color) 12%, transparent);
    animation: pulseRing 3.6s ease-out infinite;
}

@keyframes pulseRing {
    0% {
        transform: scale(0.7);
        opacity: 0.5;
    }
    60% {
        opacity: 0.15;
    }
    100% {
        transform: scale(1.9);
        opacity: 0;
    }
}

/* ── Scanline overlay ──────────────────────────────────── */
.scanlines {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 1;
    background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.04) 3px,
        rgba(0, 0, 0, 0.04) 4px
    );
    animation: scanlineDrift 8s linear infinite;
}

@keyframes scanlineDrift {
    from {
        background-position-y: 0;
    }
    to {
        background-position-y: 80px;
    }
}

/* ── Title glow ────────────────────────────────────────── */
.title-glow {
    font-size: 1.4rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    animation: titlePulse 4s ease-in-out infinite;
}

html.dark .title-glow {
    color: var(--text-light);
    text-shadow:
        0 0 6px color-mix(in srgb, var(--primary-color) 70%, transparent),
        0 0 18px color-mix(in srgb, var(--primary-color) 40%, transparent),
        0 0 40px color-mix(in srgb, var(--primary-color) 20%, transparent);
}

html.light .title-glow {
    color: color-mix(in srgb, var(--primary-color) 80%, black);
    text-shadow:
        0 0 4px color-mix(in srgb, var(--primary-color) 30%, transparent),
        0 0 12px color-mix(in srgb, var(--primary-color) 15%, transparent);
}

@keyframes titlePulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.82;
    }
}

/* ── Main content ──────────────────────────────────────── */
.main-content {
    position: relative;
    z-index: 10;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    animation: fadeIn 0.8s 0.15s ease both;
}

/* ── Color mode toggle ─────────────────────────────────── */
.color-mode-toggle {
    width: 45px;
    height: 45px;
    font-size: 2rem;
    background-color: transparent;
    color: white;
    border: 1px solid color-mix(in srgb, var(--primary-color) 20%, transparent);
    border-radius: 50%;
    cursor: pointer;
    transition:
        background-color 0.3s,
        border-color 0.3s,
        box-shadow 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
}
.color-mode-toggle:hover {
    background-color: color-mix(in srgb, var(--primary-color) 8%, transparent);
    border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
    box-shadow: 0 0 10px
        color-mix(in srgb, var(--primary-color) 25%, transparent);
}
</style>
