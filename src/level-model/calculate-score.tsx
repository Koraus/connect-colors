import { findMatches } from "./find-matches";


export const calculateScore = (field: number[][]) => {
    const machesIndexes = findMatches(field);
    const len = machesIndexes.length;

    if (machesIndexes.length > 5) { return len * 4; }
    if (machesIndexes.length > 3) { return len * 3; }
    return len * 2;
};
