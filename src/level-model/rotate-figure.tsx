import { Figure } from "./figure";

const rotatedFigure = (figure: Figure) => {
    const numRows = figure.length;
    const numCols = figure[0].length;
    const rotatedFigure = new Array(numCols)
        .fill(null)
        .map(() => new Array(numRows).fill(null));

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            rotatedFigure[col][numRows - row - 1] = figure[row][col];
        }
    }
    return rotatedFigure as Figure;
};

export const rotateFigure = (figure: Figure, rotation = 1): Figure => {
    if (rotation !== rotation >>> 0) { throw new Error("rotation must be integer"); }

    rotation = rotation % 4;
    if (rotation < 0) { rotation += 4; }

    if (rotation === 0) { return figure; }
    if (rotation === 1) { return rotatedFigure(figure); }

    return rotateFigure(figure, rotation - 1);
};
