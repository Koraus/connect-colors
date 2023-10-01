import { checkMatch } from "./check-match";


export const calculateScore = (field: number[][]) => {
    const machesIndexes = checkMatch(field);
    let score = 0;
    if (machesIndexes.length <= 3) {
        score = machesIndexes.length * 2;
    }
    if (machesIndexes.length > 3 && machesIndexes.length <= 5) {
        score = machesIndexes.length * 3;
    }
    if (machesIndexes.length > 5) {
        score = machesIndexes.length * 4;
    }
    return score;
};
