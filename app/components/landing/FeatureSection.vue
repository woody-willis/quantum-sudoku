<template>
    <section class="feature" :class="{ 'feature--reverse': reversed }">
        <div class="feature__visual">
            <slot />
        </div>
        <div class="feature__body">
            <p class="feature__index">
                [ ELEMENT {{ String(index).padStart(2, "0") }} ]
            </p>
            <h2 class="feature__name">{{ name }}</h2>
            <p class="feature__desc">{{ description }}</p>
        </div>
    </section>
</template>

<script setup>
defineProps({
    name: { type: String, required: true },
    description: { type: String, required: true },
    index: { type: Number, required: true },
    reversed: { type: Boolean, default: false },
});
</script>

<style scoped>
.feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 420px;
    border-top: 1px solid
        color-mix(in srgb, var(--primary-color) 12%, transparent);
    overflow: hidden;
}

.feature--reverse {
    direction: rtl;
}
.feature--reverse > * {
    direction: ltr;
}

/* ── Visual panel ───────────────────────────────────────── */
.feature__visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    overflow: hidden;
}

html.dark .feature__visual {
    background: color-mix(in srgb, var(--primary-color) 4%, #0a0a0a);
}
html.light .feature__visual {
    background: color-mix(in srgb, var(--primary-color) 5%, #f0f4ff);
}

.feature__visual::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.025) 3px,
        rgba(0, 0, 0, 0.025) 4px
    );
    pointer-events: none;
}

/* ── Body ───────────────────────────────────────────────── */
.feature__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding: 3.5rem;
}

.feature__index {
    font-family: "Courier New", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    opacity: 0.45;
}

.feature__name {
    font-family: "Courier New", monospace;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
}

html.dark .feature__name {
    color: var(--text-light);
    text-shadow:
        0 0 6px color-mix(in srgb, var(--primary-color) 50%, transparent),
        0 0 20px color-mix(in srgb, var(--primary-color) 20%, transparent);
}

html.light .feature__name {
    color: color-mix(in srgb, var(--primary-color) 85%, black);
}

.feature__desc {
    font-size: 0.95rem;
    line-height: 1.8;
    opacity: 0.65;
    max-width: 440px;
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 700px) {
    .feature {
        grid-template-columns: 1fr;
        min-height: unset;
    }
    .feature--reverse {
        direction: ltr;
    }
    .feature__visual {
        min-height: 220px;
    }
    .feature__body {
        padding: 2rem 1.8rem;
    }
}
</style>
