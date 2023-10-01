import { Figure } from "./figure";


export const canPlaceFigureInCoords = (
    figure: Figure, field: number[][], coords: [number, number]
) => {

    const maxHeightIndex = field.length - 1;
    const maxWidthIndex = field[0].length - 1;

    const [x, y] = coords;
    let canPlace = true;

    for (let i = 0; i < figure?.length; i++) {
        for (let j = 0; j < figure[i].length; j++) {

            if (field[x + i] === undefined) {
                canPlace = false;
                return false;
            }
            if (field[x + i][y + j] !== 0
                && figure[i][j] !== 0
                || field[x + i][y + j] === undefined
                || x + i > maxHeightIndex
                || y + j > maxWidthIndex
                || x + i < 0
                || y + j < 0) {

                canPlace = false;
                return false;
            }
        }
    }
    return canPlace;
};
