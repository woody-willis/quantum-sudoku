<template>
    <div class="vis">
        <svg
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
        >
            <circle
                v-for="(dot, k) in dots"
                :key="k"
                :cx="dot.x"
                :cy="dot.y"
                :r="dot.r"
                fill="var(--primary-color)"
                :opacity="dot.opacity"
                class="dot"
                :style="{ animationDelay: `${dot.delay}s` }"
            />
        </svg>
    </div>
</template>

<script setup>
const dots = Array.from({ length: 60 }, (_, k) => ({
    x: (k % 10) * 20 + 5 + Math.sin(k) * 4,
    y: Math.floor(k / 10) * 20 + 5 + Math.cos(k) * 4,
    r: 1.2 + Math.abs(Math.sin(k * 1.7)) * 2.5,
    opacity: 0.15 + Math.abs(Math.sin(k * 0.9)) * 0.6,
    delay: -(k * 0.11),
}));
</script>

<style scoped>
.vis {
    width: 100%;
    max-width: 280px;
}
.vis svg {
    width: 100%;
    height: auto;
}

.dot {
    animation: noisePulse 2.2s ease-in-out infinite alternate;
}

@keyframes noisePulse {
    from {
        opacity: var(--base-opacity, 0.4);
    }
    to {
        opacity: 0.1;
    }
}
</style>
