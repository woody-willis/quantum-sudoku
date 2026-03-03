<template>
    <div id="phaser-container"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import Phaser from "phaser";

// Basic Phaser Scene
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        // Load assets here
    }

    create() {
        this.add
            .text(400, 300, "Quantum Sudoku Game", {
                fontSize: "32px",
                fill: "#ffffff",
            })
            .setOrigin(0.5);
    }
}

let game = null;

onMounted(() => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "phaser-container",
        backgroundColor: "#000000",
        scene: MainScene,
    };

    game = new Phaser.Game(config);
});

onUnmounted(() => {
    if (game) {
        game.destroy(true);
    }
});
</script>

<style scoped>
#phaser-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
