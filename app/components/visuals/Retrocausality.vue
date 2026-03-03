<template>
    <div class="vis">
        <svg
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
        >
            <defs>
                <marker
                    id="arr-back"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                >
                    <path d="M6,0 L0,3 L6,6 Z" fill="var(--primary-color)" />
                </marker>
            </defs>
            <!-- Timeline arrow pointing backward -->
            <line
                x1="160"
                y1="60"
                x2="40"
                y2="60"
                stroke="var(--primary-color)"
                stroke-width="2"
                marker-end="url(#arr-back)"
                opacity="0.9"
            />
            <!-- Tick marks -->
            <line
                v-for="x in [40, 80, 120, 160]"
                :key="x"
                :x1="x"
                y1="50"
                :x2="x"
                y2="70"
                stroke="var(--primary-color)"
                stroke-width="1"
                opacity="0.4"
            />
            <!-- Labels -->
            <text
                x="38"
                y="45"
                fill="var(--primary-color)"
                font-size="9"
                opacity="0.6"
                font-family="monospace"
            >
                t = -Δ
            </text>
            <text
                x="119"
                y="45"
                fill="var(--primary-color)"
                font-size="9"
                opacity="0.6"
                font-family="monospace"
            >
                t = 0
            </text>
            <!-- Retrocausal pulse traveling backward (right → left) -->
            <circle
                r="5"
                cy="60"
                fill="var(--primary-color)"
                opacity="0.9"
                class="pulse-dot"
            >
                <animateMotion
                    dur="2.4s"
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1"
                    path="M160,0 L40,0"
                />
                <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="r"
                    values="3;5;5;2"
                    keyTimes="0;0.1;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                />
            </circle>
            <!-- Glow trail -->
            <circle
                r="9"
                cy="60"
                fill="var(--primary-color)"
                opacity="0"
                class="pulse-glow"
            >
                <animateMotion
                    dur="2.4s"
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1"
                    path="M160,0 L40,0"
                />
                <animate
                    attributeName="opacity"
                    values="0;0.2;0.2;0"
                    keyTimes="0;0.1;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                />
            </circle>
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
</style>
