import { Figure } from "./data-recoil/playing-data";

export const hasMinTwoSameNeighbors = (
    x: number, y: number, field: number[][]) => {

    const value = field[x][y];
    const maxHeightIndex = field.length - 1;
    const maxWidthIndex = field[0].length - 1;

    const right = y < maxWidthIndex ? field[x][y + 1] : undefined;
    const left = y > 0 ? field[x][y - 1] : undefined;

    const top = x < maxHeightIndex ? field[x + 1][y] : undefined;
    const bottom = x > 0 ? field[x - 1][y] : undefined;

    const neighbors = [];

    if (right && right === value) neighbors.push([x, y + 1]);
    if (left && left === value) neighbors.push([x, y - 1]);
    if (top !== undefined && top === value) neighbors.push([x + 1, y]);
    if (bottom && bottom === value) neighbors.push([x - 1, y]);

    if (neighbors.length >= 2) { neighbors.push([x, y]) }

    return neighbors.length >= 3 ? neighbors : [];

}

export const checkMatch = (field: number[][]) => {

    const maches = []

    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
            const machedCells = hasMinTwoSameNeighbors(x, y, field);
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
    console.log(uniqueCoords)
    return uniqueCoords;
}

export const canPlaceFigureInCoords = (
    figure: Figure, field: number[][], coords: [number, number]
) => {

    const [x, y] = coords;
    let canPlace = true;

    for (let i = 0; i < figure?.length; i++) {
        for (let j = 0; j < figure[i].length; j++) {
            if (field[x + i][y + j] !== 0 && figure[i][j] !== 0
                || x + i > 9 || y + j > 9 || x + i < 0 || y + j < 0) {
                canPlace = false
                console.log('can`t Place')
                return
            }
        }
    }
    return canPlace;
}

export const canPlaceOnField = (figure: Figure, field: number[][]) => {

    const allCoords = field
        .map((e, i) => e.map((e, i1) => [i, i1])).flat() as [number, number][];

    let canPlace = true;

    for (const coords of allCoords) {
        canPlace = canPlaceFigureInCoords(figure, field, coords) ? true : false;
    }

    return canPlace;
}