import { coorsOfCellWithMinTwoSameNeighbors } from "./coors-of-cell-with-min-two-same-neighbors";

export const checkMatch = (field: number[][]) => {

    const maches = []

    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
            const machedCells = coorsOfCellWithMinTwoSameNeighbors(x, y, field);
            if (machedCells.length > 0) { maches.push(machedCells) }
        }
    }

    const uniqueCoords = [];

    for (const item of maches.flat()) {

        let isUnique = true;

        for (const uniqueCoord of uniqueCoords) {
            if (item[0] === uniqueCoord[0] && item[1] === uniqueCoord[1]) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            uniqueCoords.push(item);
        }
    }
    return uniqueCoords;
}
