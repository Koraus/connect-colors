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

    if (neighbors.length >= 2) { neighbors.push([x, y]); }

    return neighbors.length >= 3 ? neighbors : [];
};
