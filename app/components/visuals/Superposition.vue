<template>
    <div class="vis">
        <svg
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
        >
            <path
                d="M10,60 Q55,10 100,60 Q145,110 190,60"
                fill="none"
                stroke="var(--primary-color)"
                stroke-width="2"
                opacity="0.9"
                class="wave1"
            />
            <path
                d="M10,60 Q55,110 100,60 Q145,10 190,60"
                fill="none"
                stroke="#a855f7"
                stroke-width="2"
                opacity="0.7"
                class="wave2"
            />
            <circle
                cx="100"
                cy="60"
                r="8"
                fill="var(--primary-color)"
                opacity="0.5"
                class="node"
            />
            <circle
                cx="100"
                cy="60"
                r="8"
                fill="#a855f7"
                opacity="0.5"
                class="node2"
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

.wave1 {
    animation: waveDrift1 3s ease-in-out infinite alternate;
}
.wave2 {
    animation: waveDrift2 3s ease-in-out infinite alternate;
}
.node {
    animation: nodePulse 1.5s ease-in-out infinite alternate;
}
.node2 {
    animation: nodePulse 1.5s ease-in-out infinite alternate-reverse;
}

@keyframes waveDrift1 {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-8px);
    }
}
@keyframes waveDrift2 {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(8px);
    }
}
@keyframes nodePulse {
    from {
        opacity: 0.5;
    }
    to {
        opacity: 1;
    }
}
</style>
