import { Figure } from "./figure";

export const rotateFigure = (figure: Figure, position?: number) => {

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
    }

    if (position === 0) return figure;
    if (position === 1 || position === undefined) return rotatedFigure(figure);
    if (position === 2) return rotatedFigure(rotatedFigure(figure));
    if (position === 3) return rotatedFigure(rotatedFigure(rotatedFigure(figure)));
    return figure;

}
