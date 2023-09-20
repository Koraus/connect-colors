import { Figure } from "./data-recoil/playing-data";

export const rotateFigure = (figure: Figure) => {
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
    return rotatedFigure
}