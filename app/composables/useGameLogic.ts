export type CellType = "empty" | "fixed" | "superposition" | "entanglement";

export interface Cell {
    id: string;
    row: number;
    col: number;
    type: CellType;
    value: number | null;
    superpositionValues?: number[];
    entanglementColor?: string;
    entanglementGroup?: string;
}

export function useGameLogic() {
    const board = ref<Cell[][]>([]);

    /**
     * Generates the initial board state.
     */
    function generateBoard(): Cell[][] {
        const size = 9;

        const entanglementColors = [
            "var(--primary-color)",
            "var(--color-purple)",
            "var(--color-green)",
            "var(--color-orange)",
            "var(--color-red)",
        ];

        // Placeholder fixed clue cells — format: 'row-col': value
        const fixedValues: Record<string, number> = {
            "0-0": 5,
            "0-4": 3,
            "0-8": 7,
            "1-2": 6,
            "1-3": 1,
            "2-5": 8,
            "3-0": 8,
            "3-6": 6,
            "4-1": 6,
            "4-4": 5,
            "4-7": 3,
            "5-2": 3,
            "5-8": 4,
            "6-3": 8,
            "6-7": 2,
            "7-5": 7,
            "7-6": 9,
            "8-0": 4,
            "8-4": 6,
            "8-8": 1,
        };

        // Placeholder superposition cells — format: 'row-col': [possible values]
        const superpositionCells: Record<string, number[]> = {
            "0-2": [2, 7, 9],
            "1-6": [4, 8],
            "3-3": [2, 5, 9],
            "5-5": [1, 6],
            "7-1": [3, 5, 8],
            "0-6": [1, 4],
        };

        // Placeholder entanglement cells — format: 'row-col': { color, group }
        const entanglementCells: Record<
            string,
            { color: string; group: string }
        > = {
            "2-3": { color: entanglementColors[0], group: "A" },
            "2-7": { color: entanglementColors[0], group: "A" },
            "6-1": { color: entanglementColors[1], group: "B" },
            "6-5": { color: entanglementColors[1], group: "B" },
            "4-6": { color: entanglementColors[2], group: "C" },
            "8-3": { color: entanglementColors[2], group: "C" },
        };

        const newBoard: Cell[][] = [];

        for (let row = 0; row < size; row++) {
            const rowCells: Cell[] = [];

            for (let col = 0; col < size; col++) {
                const key = `${row}-${col}`;

                let cell: Cell = {
                    id: key,
                    row,
                    col,
                    type: "empty",
                    value: null,
                };

                if (fixedValues[key] !== undefined) {
                    cell = { ...cell, type: "fixed", value: fixedValues[key] };
                } else if (superpositionCells[key]) {
                    cell = {
                        ...cell,
                        type: "superposition",
                        superpositionValues: superpositionCells[key],
                        value: null,
                    };
                } else if (entanglementCells[key]) {
                    const ent = entanglementCells[key];
                    cell = {
                        ...cell,
                        type: "entanglement",
                        entanglementColor: ent.color,
                        entanglementGroup: ent.group,
                        value: null,
                    };
                }

                rowCells.push(cell);
            }

            newBoard.push(rowCells);
        }

        return newBoard;
    }

    function startGame() {
        board.value = generateBoard();
    }

    return { board, generateBoard, startGame };
}
