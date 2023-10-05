const coorsOfCellWithMinTwoSameNeighbors = (
    x: number, y: number,
    field: number[][],
) => {
    const value = field[x][y];
    if (value === 0) { return []; }

    const sameNeighbors =
        [[0, 1], [1, 0], [0, -1], [-1, 0]]
            .map(([dx, dy]) => [x + dx, y + dy] as [number, number])
            .filter(([nx, ny]) => {
                const h = field.length;
                const w = field[0].length;
                if (nx < 0 || nx >= h || ny < 0 || ny >= w) { return false; }
                return field[nx][ny] === value;
            });

    if (sameNeighbors.length < 2) { return []; }

    return [
        [x, y] as [number, number],
        ...sameNeighbors,
    ];
};


export const findMatches = (field: number[][]) => {

    const maches = new Set<string>();

    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
            const machedCells = coorsOfCellWithMinTwoSameNeighbors(x, y, field);
            for (const el of machedCells) {
                maches.add(JSON.stringify(el));
            }
        }
    }

    return [...maches].map(el => JSON.parse(el) as [number, number]);
};
