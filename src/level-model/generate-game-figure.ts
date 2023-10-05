import { Figure } from "./figure";

export const typicalFigures = [[
    [1],
], [
    [1, 1],
], [
    [1, 1, 1],
], [
    [1, 1, 1, 1],
], [
    [0, 1],
    [1, 0],
], [
    [1, 1],
    [0, 1],
], [
    [1, 1],
    [1, 1],
], [
    [1, 0, 1],
    [0, 1, 0],
], [
    [0, 0, 1],
    [1, 1, 1],
], [
    [1, 0, 1],
    [1, 1, 0],
], [
    [0, 1, 1],
    [1, 1, 0],
], [
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
], [
    [1, 0, 0],
    [0, 1, 1],
    [0, 0, 1],
], [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
], [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
], [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
]];

export const selectValues = (
    differentValues: 1 | 2 | 3,
    random01: () => number,
) => {
    const totalValues = 3;
    const values: number[] = [];
    do {
        const value = Math.floor(random01() * totalValues + 1);

        if (!values.includes(value)) {
            values.push(value);
        }

    } while (values.length < differentValues);
    return values;
};

export const fillFigureBlank = (
    blankFigure: number[][],
    valuesNumber: number[],
    random01: () => number,
) => {
    const vals = valuesNumber;
    const figure: number[][] =
        Array.from(Array(blankFigure.length),
            () => new Array(
                blankFigure[0].length).fill(0),
        );

    for (let i = 0; i < blankFigure.length; i++) {
        for (let j = 0; j < blankFigure[i].length; j++) {
            if (blankFigure[i][j] !== 0) {
                const val = vals[Math.floor(random01() * vals.length)];
                figure[i][j] = val;
            }
        }
    }
    return figure;
};

export const generateGameFigure = (
    lvl: "0" | "1" | "2",
    random01: () => number,
): Figure => {

    if (lvl === "0") {
        const index = Math.floor(Math.random() * 10);
        const blankFigure = typicalFigures[index];
        const valuesNumber = selectValues(3, random01);
        const figure = fillFigureBlank(blankFigure, valuesNumber, random01);
        return figure;
    }
    if (lvl === "1") {
        const complexityFiguresLevel = 5;
        const index = Math.floor(Math.random() * 7) + complexityFiguresLevel;
        const blankFigure = typicalFigures[index];
        const valuesNumber = selectValues(3, random01);
        const figure = fillFigureBlank(blankFigure, valuesNumber, random01);
        return figure;
    }

    if (lvl === "2") {
        const complexityFiguresLevel = 10;
        const index = Math.floor(Math.random() * 5) + complexityFiguresLevel;
        const blankFigure = typicalFigures[index];
        const valuesNumber = selectValues(3, random01);
        const figure = fillFigureBlank(blankFigure, valuesNumber, random01);
        return figure;
    }

    throw new Error(`lvl ${lvl} is not supported`);
};
