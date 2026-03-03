<template>
    <div class="game-container">
        <h2>Quantum Sudoku</h2>
        <div class="game-wrapper">
            <ClientOnly>
                <PhaserGame />
                <template #fallback>
                    <div class="loading">Loading Game Engine...</div>
                </template>
            </ClientOnly>
        </div>
        <NuxtLink to="/" class="btn btn-secondary mt-3">Back Home</NuxtLink>
    </div>
</template>

<style scoped>
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.game-wrapper {
    border: 4px solid var(--border-color, #ccc);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.loading {
    width: 800px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #222;
    color: white;
    font-size: 1.5rem;
}

.mt-3 {
    margin-top: 1rem;
}
</style>
