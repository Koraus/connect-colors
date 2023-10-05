import { findMatches } from "./find-matches";


export const destroyMatches = (field: number[][]) => {
    const field1 = structuredClone(field);
    for (const [x, y] of findMatches(field)) {
        field1[x][y] = 0;
    }
    return field1;
};
