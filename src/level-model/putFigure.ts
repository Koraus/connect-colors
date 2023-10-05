import { CellColor } from ".";
import { Figure } from "./figure";



export const putFigure = ({
    field, figure, coords, isCroppingActive,
}: {
    field: CellColor[][];
    figure: Figure;
    coords: [number, number];
    isCroppingActive: boolean;
}): CellColor[][] => {
    const fieldWithFigure = structuredClone(field);
    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure[i].length; j++) {
            if (figure[i][j] === 0) { continue; }
            if (isCroppingActive
                && field[coords[0] + i][coords[1] + j] !== 0) { continue; }
            fieldWithFigure[coords[0] + i][coords[1] + j] = figure[i][j];
        }
    }
    return fieldWithFigure;
};
