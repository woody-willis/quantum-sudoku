<template>
    <div class="landing-root">
        <LandingHero />

        <LandingFeatureSection
            name="Superposition"
            description="A cell can hold multiple possible values simultaneously where you can alter the probability distribution of these values. Your moves exist in a quantum state of maybe."
            :index="1"
        >
            <VisualsSuperposition />
        </LandingFeatureSection>

        <LandingFeatureSection
            name="Observation"
            description="The act of checking a cell collapses its quantum state. Look too hard and you might change the answer. Have bad luck? Maybe the puzzle just doesn't want to be solved."
            :index="2"
            reversed
        >
            <VisualsObservation />
        </LandingFeatureSection>

        <LandingFeatureSection
            name="Noise"
            description="Quantum decoherence bleeds into the grid. Random fluctuations can corrupt neighbouring cells and challenge your logic."
            :index="3"
        >
            <VisualsNoise />
        </LandingFeatureSection>

        <LandingFeatureSection
            name="Entanglement"
            description="The state where more than one superpositioned cell are dependent on each other. Change one, and its partner instantly feels the effect regardless of distance. Observe one, and you might just solve the other. Or not, who knows!"
            :index="4"
            reversed
        >
            <VisualsEntanglement />
        </LandingFeatureSection>

        <LandingFeatureSection
            name="Retrocausality"
            description="The future can ripple backwards in time. What you change next turn may have already altered what came before."
            :index="5"
        >
            <VisualsRetrocausality />
        </LandingFeatureSection>

        <LandingFeatureSection
            name="Tunnelling"
            description="A value can pass through an impossible barrier. Rules bend and numbers slip where they should not fit."
            :index="6"
            reversed
        >
            <VisualsTunnelling />
        </LandingFeatureSection>
    </div>
</template>

<style scoped>
.landing-root {
    align-self: stretch;
    margin: -2rem;
    display: flex;
    flex-direction: column;
}
</style>
