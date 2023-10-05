import { CellColor } from ".";
import { Figure } from "./figure";


export const canPutFigure = ({
    field, figure, coords: [x, y], isCroppingActive,
}: {
    field: CellColor[][],
    figure: Figure,
    coords: [number, number],
    isCroppingActive: boolean,
}) => {
    for (let i = 0; i < figure.length; i++) {
        if (field[x + i] === undefined) { return false; }
        for (let j = 0; j < figure[i].length; j++) {
            if (field[x + i][y + j] === undefined) { return false; }
            if (
                field[x + i][y + j] !== 0
                && figure[i][j] !== 0
                && !isCroppingActive
            ) {
                return false;
            }
        }
    }
    return true;
};

/** @deprecated Use `canPutFigure` instead */
export const canPutFigure0 = (
    figure: Figure, field: number[][], coords: [number, number],
) => canPutFigure({ figure, field, coords, isCroppingActive: false });
