<template>
    <div
        class="sudoku-cell"
        :class="[`cell--${cell.type}`, { 'is-glitching': glitching }]"
        :style="entanglementStyle"
    >
        <!-- Fixed cell -->
        <span v-if="cell.type === 'fixed'" class="cell-value cell-value--fixed">
            {{ cell.value }}
        </span>

        <!-- Empty cell -->
        <span
            v-else-if="cell.type === 'empty'"
            class="cell-value cell-value--empty"
        />

        <!-- Superposition cell -->
        <span
            v-else-if="cell.type === 'superposition'"
            class="cell-value cell-value--superposition"
        >
            <span class="glitch-char" :class="{ 'glitch-anim': glitching }">{{
                displayValue
            }}</span>
            <span class="superposition-hint">{{
                cell.superpositionValues?.join(" ")
            }}</span>
        </span>

        <!-- Entanglement cell -->
        <span
            v-else-if="cell.type === 'entanglement'"
            class="cell-value cell-value--entanglement"
        >
            <span class="glitch-char" :class="{ 'glitch-anim': glitching }">{{
                displayValue
            }}</span>
            <span class="entanglement-label">{{ cell.entanglementGroup }}</span>
        </span>
    </div>
</template>

<script setup lang="ts">
import type { Cell } from "~/composables/useGameLogic";

const props = defineProps<{ cell: Cell }>();

const GLITCH_POOL = "0123456789ψΦ∞⊗⊕?#";

const displayValue = ref<string>("");
const glitching = ref(false);

let glitchInterval: ReturnType<typeof setInterval> | null = null;
let flashTimeout: ReturnType<typeof setTimeout> | null = null;

function pickGlitchChar(): string {
    if (
        props.cell.type === "superposition" &&
        props.cell.superpositionValues?.length
    ) {
        const pool = props.cell.superpositionValues;
        return String(pool[Math.floor(Math.random() * pool.length)]);
    }
    if (props.cell.type === "entanglement") {
        // Show a cycling quantum symbol
        return GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)];
    }
    return "";
}

function triggerGlitch() {
    glitching.value = true;
    displayValue.value = pickGlitchChar();
    if (flashTimeout) clearTimeout(flashTimeout);
    flashTimeout = setTimeout(() => {
        glitching.value = false;
        displayValue.value = pickGlitchChar();
    }, 160);
}

function initGlitch() {
    if (
        props.cell.type !== "superposition" &&
        props.cell.type !== "entanglement"
    )
        return;
    displayValue.value = pickGlitchChar();

    const baseDelay = props.cell.type === "entanglement" ? 600 : 900;
    const jitter = Math.random() * 400;

    glitchInterval = setInterval(() => {
        triggerGlitch();
        // occasionally double-flash
        if (Math.random() < 0.3) {
            setTimeout(triggerGlitch, 200);
        }
    }, baseDelay + jitter);
}

const entanglementStyle = computed(() => {
    if (props.cell.type !== "entanglement" || !props.cell.entanglementColor)
        return {};
    return { "--ent-color": props.cell.entanglementColor };
});

onMounted(() => {
    initGlitch();
});

onUnmounted(() => {
    if (glitchInterval) clearInterval(glitchInterval);
    if (flashTimeout) clearTimeout(flashTimeout);
});
</script>

<style scoped>
.sudoku-cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    /* Solid background so the parent box/board gap shows as separator lines */
    background: color-mix(
        in srgb,
        var(--background-dark) 99%,
        var(--primary-color) 1%
    );
    transition: background 0.15s ease;
    cursor: default;
    overflow: hidden;
}

html.light .sudoku-cell {
    background: color-mix(
        in srgb,
        var(--background-light) 97%,
        var(--primary-color) 3%
    );
}

/* ── Cell value base ──────────────────────────────────────── */
.cell-value {
    font-family: "Courier New", monospace;
    font-size: clamp(0.85rem, 2.2vw, 1.35rem);
    font-weight: 700;
    line-height: 1;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

/* ── Fixed ─────────────────────────────────────────────────── */
.cell--fixed {
    /* slightly dimmer background to distinguish from player cells */
}
.cell-value--fixed {
    opacity: 0.9;
    font-weight: 800;
    color: inherit;
}

/* ── Empty ─────────────────────────────────────────────────── */
.cell--empty {
    cursor: pointer;
}
.cell--empty:hover {
    background: color-mix(
        in srgb,
        var(--background-dark) 99.7%,
        var(--primary-color) 0.3%
    );
}

/* ── Superposition ─────────────────────────────────────────── */
.cell--superposition {
    cursor: pointer;
}
.cell--superposition:hover {
    background: color-mix(
        in srgb,
        var(--background-dark) 99.7%,
        var(--primary-color) 0.3%
    );
}
.cell-value--superposition {
    flex-direction: column;
    gap: 0;
    position: relative;
}
.cell-value--superposition .glitch-char {
    color: var(--primary-color);
    font-size: clamp(0.9rem, 2.2vw, 1.4rem);
    text-shadow: 0 0 8px
        color-mix(in srgb, var(--primary-color) 70%, transparent);
}
.superposition-hint {
    position: absolute;
    bottom: 3px;
    right: 4px;
    font-size: clamp(0.38rem, 0.9vw, 0.58rem);
    opacity: 0.45;
    letter-spacing: -0.02em;
    font-weight: 600;
    font-family: "Courier New", monospace;
    color: var(--primary-color);
    line-height: 1;
    white-space: nowrap;
}

/* ── Entanglement ──────────────────────────────────────────── */
.cell--entanglement {
    cursor: pointer;
    box-shadow:
        inset 0 0 0 2px var(--ent-color, var(--primary-color)),
        0 0 12px
            color-mix(
                in srgb,
                var(--ent-color, var(--primary-color)) 35%,
                transparent
            ),
        inset 0 0 14px
            color-mix(
                in srgb,
                var(--ent-color, var(--primary-color)) 12%,
                transparent
            );
    z-index: 1;
}
.cell--entanglement:hover {
    background: color-mix(
        in srgb,
        var(--background-dark) 90%,
        var(--primary-color) 10%
    );
}
.cell-value--entanglement {
    flex-direction: column;
    gap: 0;
    position: relative;
}
.cell-value--entanglement .glitch-char {
    color: var(--ent-color, var(--primary-color));
    font-size: clamp(0.9rem, 2.2vw, 1.4rem);
    text-shadow: 0 0 10px var(--ent-color, var(--primary-color));
}
.entanglement-label {
    position: absolute;
    top: 3px;
    left: 5px;
    font-size: clamp(0.38rem, 0.85vw, 0.52rem);
    font-weight: 800;
    letter-spacing: 0.06em;
    opacity: 0.6;
    color: var(--ent-color, var(--primary-color));
    line-height: 1;
    text-transform: uppercase;
}

/* ── Glitch animation ──────────────────────────────────────── */
.glitch-char {
    display: inline-block;
    transition: color 0.08s;
}
.glitch-anim {
    animation: glitch-flash 0.16s steps(2) both;
}

@keyframes glitch-flash {
    0% {
        transform: none;
        opacity: 1;
        filter: none;
    }
    25% {
        transform: skewX(12deg) translateX(-3px);
        opacity: 0.55;
        filter: hue-rotate(60deg) brightness(1.8);
    }
    50% {
        transform: skewX(-8deg) translateX(2px);
        opacity: 0.8;
        filter: hue-rotate(-40deg);
    }
    75% {
        transform: skewX(4deg) translateX(-1px);
        opacity: 0.65;
    }
    100% {
        transform: none;
        opacity: 1;
        filter: none;
    }
}

/* ── Global glitch pulse on container ─────────────────────── */
.sudoku-cell.is-glitching::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: color-mix(in srgb, var(--primary-color) 2%, transparent);
    animation: cell-pulse 0.16s ease both;
}
.cell--entanglement.is-glitching::after {
    background: color-mix(
        in srgb,
        var(--ent-color, var(--primary-color)) 4%,
        transparent
    );
}

html.light .cell--empty:hover,
html.light .cell--superposition:hover {
    background: color-mix(
        in srgb,
        var(--background-light) 99.3%,
        var(--primary-color) 0.7%
    );
}

@keyframes cell-pulse {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
