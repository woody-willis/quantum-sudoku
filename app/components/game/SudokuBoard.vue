<template>
    <div class="board-wrapper">
        <!-- Outer 3×3 grid of boxes —— gap = box separator lines -->
        <div class="board-grid">
            <div v-for="(boxCells, bi) in boxes" :key="bi" class="box">
                <!-- Inner 3×3 grid of cells —— gap = cell separator lines -->
                <GameSudokuCell
                    v-for="cell in boxCells"
                    :key="cell.id"
                    :cell="cell"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Cell } from "~/composables/useGameLogic";

const props = defineProps<{ board: Cell[][] }>();

// Flatten board into 9 boxes in reading order (left-to-right, top-to-bottom).
// Each box contains its 9 cells in reading order.
const boxes = computed(() => {
    const result: Cell[][] = [];
    for (let br = 0; br < 3; br++) {
        for (let bc = 0; bc < 3; bc++) {
            const cells: Cell[] = [];
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    cells.push(props.board[br * 3 + r][bc * 3 + c]);
                }
            }
            result.push(cells);
        }
    }
    return result;
});
</script>

<style scoped>
.board-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    width: 100%;
}

/* Outer grid: 3 columns × 3 rows. Gap IS the box-separator line. */
.board-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 3px;
    width: min(92vw, 74vh);
    aspect-ratio: 1;
    border-radius: 20px;
    overflow: hidden;
    border: 1.5px solid
        color-mix(in srgb, var(--primary-color) 35%, transparent);
    box-shadow:
        0 0 40px color-mix(in srgb, var(--primary-color) 14%, transparent),
        0 0 80px color-mix(in srgb, var(--primary-color) 7%, transparent),
        inset 0 0 40px color-mix(in srgb, var(--primary-color) 4%, transparent);
    /* Board background shows through the 3px box-separator gaps */
    background: color-mix(in srgb, var(--primary-color) 38%, transparent);
}

/* Inner grid: 3 columns × 3 cells. Gap IS the cell-separator line. */
.box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1px;
    /* Box background shows through the 1px cell-separator gaps */
    background: color-mix(in srgb, currentColor 16%, transparent);
}

html.dark .box {
    background: rgba(255, 255, 255, 0.12);
}
html.light .box {
    background: rgba(0, 0, 0, 0.13);
}
</style>
