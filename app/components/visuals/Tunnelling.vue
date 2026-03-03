<template>
    <div class="vis">
        <svg
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
        >
            <!-- Barrier -->
            <rect
                x="88"
                y="20"
                width="24"
                height="80"
                fill="var(--primary-color)"
                opacity="0.15"
                rx="2"
            />
            <rect
                x="88"
                y="20"
                width="24"
                height="80"
                fill="none"
                stroke="var(--primary-color)"
                stroke-width="1.5"
                rx="2"
                opacity="0.6"
            />
            <!-- Approach trail -->
            <path
                d="M50,60 L88,60"
                stroke="var(--primary-color)"
                stroke-width="2"
                opacity="0.5"
            />
            <!-- Exit trail (ghost) -->
            <path
                d="M112,60 L155,60"
                stroke="var(--primary-color)"
                stroke-width="2"
                opacity="0.25"
                stroke-dasharray="4 3"
            />
            <!-- Moving particle -->
            <circle
                cx="40"
                cy="60"
                r="10"
                fill="var(--primary-color)"
                opacity="0.9"
                class="tunnel-particle"
            />
            <!-- Ghost on far side -->
            <circle
                cx="160"
                cy="60"
                r="10"
                fill="var(--primary-color)"
                opacity="0.3"
                class="tunnel-ghost"
            />
        </svg>
    </div>
</template>

<style scoped>
.vis {
    width: 100%;
    max-width: 280px;
}
.vis svg {
    width: 100%;
    height: auto;
}

.tunnel-particle {
    animation: tunnelMove 2.8s ease-in-out infinite;
}
.tunnel-ghost {
    animation: ghostFade 2.8s ease-in-out infinite;
}

@keyframes tunnelMove {
    0% {
        transform: translateX(0);
        opacity: 0.9;
    }
    45% {
        transform: translateX(48px);
        opacity: 0.9;
    }
    55% {
        transform: translateX(72px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 0.9;
    }
}
@keyframes ghostFade {
    0% {
        opacity: 0;
    }
    55% {
        opacity: 0;
    }
    70% {
        opacity: 0.55;
    }
    90% {
        opacity: 0.3;
    }
    100% {
        opacity: 0;
    }
}
</style>
