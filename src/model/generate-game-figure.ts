import { Figure } from "./figure";

export const typicalFigures = [
    [
        [1],
    ],
    [
        [1, 1],
    ],
    [
        [1, 1, 1],
    ],
    [
        [1, 1, 1, 1],
    ],
    [
        [0, 1],
        [1, 0],
    ],
    [
        [1, 1],
        [0, 1],
    ],
    [
        [1, 1],
        [1, 1],
    ],
    [
        [1, 0, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
    ],
    [
        [1, 0, 1],
        [1, 1, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 1],
        [1, 1, 0],
    ],
    [
        [1, 0, 0],
        [0, 1, 1],
        [0, 0, 1],
    ],
    [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
    ],
];

export const selectValues = (differentValues: 1 | 2 | 3) => {
    const totalValues = 3;
    const values: number[] = [];
    do {
        const value = Math.floor(Math.random() * totalValues + 1);

        if (!values.includes(value)) {
            values.push(value);
        }

    } while (values.length < differentValues);
    return values;
};

export const fillFigureBlank = (blankFigure: number[][], valuesNamber: number[]) => {
    const vals = valuesNamber;
    const figure: number[][] =
        Array.from(Array(blankFigure.length),
            () => new Array(
                blankFigure[0].length).fill(0),
        );

    for (let i = 0; i < blankFigure.length; i++) {
        for (let j = 0; j < blankFigure[i].length; j++) {
            if (blankFigure[i][j] !== 0) {
                const val = vals[Math.floor(Math.random() * vals.length)];
                figure[i][j] = val;
            }
        }
    }
    return figure;
};

export const generateGameFigure = (lvl: 1 | 2 | 3): Figure => {

    if (lvl === 1) {
        const index = Math.floor(Math.random() * 10);
        const blankFigure = typicalFigures[index];
        const valuesNamber = selectValues(3);
        const figure = fillFigureBlank(blankFigure, valuesNamber);
        return figure;
    }
    if (lvl === 2) {
        const complexityFiguresLevel = 5;
        const index = Math.floor(Math.random() * 7) + complexityFiguresLevel;
        const blankFigure = typicalFigures[index];
        const valuesNamber = selectValues(3);
        const figure = fillFigureBlank(blankFigure, valuesNamber);
        return figure;
    }

    if (lvl === 3) {
        const complexityFiguresLevel = 10;
        const index = Math.floor(Math.random() * 5) + complexityFiguresLevel;
        const blankFigure = typicalFigures[index];
        const valuesNamber = selectValues(3);
        const figure = fillFigureBlank(blankFigure, valuesNamber);
        return figure;
    }
    return [];

};
