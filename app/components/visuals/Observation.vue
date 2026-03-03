<template>
    <div class="vis">
        <svg
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
        >
            <ellipse
                cx="100"
                cy="60"
                rx="70"
                ry="28"
                fill="none"
                stroke="var(--primary-color)"
                stroke-width="1.5"
                opacity="0.5"
            />
            <line
                v-for="deg in spokes"
                :key="deg"
                :x1="100 + 25 * Math.cos((deg * Math.PI) / 180)"
                :y1="60 + 25 * Math.sin((deg * Math.PI) / 180)"
                :x2="100 + 55 * Math.cos((deg * Math.PI) / 180)"
                :y2="60 + 55 * Math.sin((deg * Math.PI) / 180)"
                stroke="var(--primary-color)"
                stroke-width="1"
                opacity="0.35"
            />
            <circle
                cx="100"
                cy="60"
                r="20"
                fill="none"
                stroke="var(--primary-color)"
                stroke-width="2"
                class="iris"
            />
            <circle
                cx="100"
                cy="60"
                r="10"
                fill="var(--primary-color)"
                opacity="0.8"
                class="pupil"
            />
        </svg>
    </div>
</template>

<script setup>
const spokes = [0, 45, 90, 135, 180, 225, 270, 315];
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

.iris {
    animation: irisPulse 2.5s ease-in-out infinite;
}
.pupil {
    animation: pupilPulse 2.5s ease-in-out infinite;
}

@keyframes irisPulse {
    0%,
    100% {
        r: 20px;
    }
    50% {
        r: 14px;
    }
}
@keyframes pupilPulse {
    0%,
    100% {
        r: 10px;
    }
    50% {
        r: 6px;
    }
}
</style>
