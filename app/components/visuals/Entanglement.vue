<template>
    <div class="vis">
        <svg
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
        >
            <!-- Link line -->
            <line
                x1="68"
                y1="60"
                x2="132"
                y2="60"
                stroke="var(--primary-color)"
                stroke-width="1"
                stroke-dasharray="4 3"
                opacity="0.5"
            />
            <!-- Arcs -->
            <path
                d="M68,60 Q100,30 132,60"
                fill="none"
                stroke="var(--primary-color)"
                stroke-width="1"
                opacity="0.4"
                stroke-dasharray="3 3"
            />
            <path
                d="M68,60 Q100,90 132,60"
                fill="none"
                stroke="#a855f7"
                stroke-width="1"
                opacity="0.4"
                stroke-dasharray="3 3"
            />
            <!-- Left particle -->
            <circle
                cx="50"
                cy="60"
                r="18"
                fill="none"
                stroke="var(--primary-color)"
                stroke-width="2"
                class="ent-left"
            />
            <circle
                cx="50"
                cy="60"
                r="7"
                fill="var(--primary-color)"
                opacity="0.8"
            />
            <!-- Right particle -->
            <circle
                cx="150"
                cy="60"
                r="18"
                fill="none"
                stroke="#a855f7"
                stroke-width="2"
                class="ent-right"
            />
            <circle cx="150" cy="60" r="7" fill="#a855f7" opacity="0.8" />
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

.ent-left {
    animation: entLeft 2s ease-in-out infinite alternate;
}
.ent-right {
    animation: entRight 2s ease-in-out infinite alternate;
}

@keyframes entLeft {
    from {
        stroke: var(--primary-color);
    }
    to {
        stroke: #a855f7;
    }
}
@keyframes entRight {
    from {
        stroke: #a855f7;
    }
    to {
        stroke: var(--primary-color);
    }
}
</style>
