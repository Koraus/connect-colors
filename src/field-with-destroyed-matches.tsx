import { checkMatch } from "./check-match"

export const fieldWithDestroyedMatches = (field: number[][]
) => {

    const machesIndexes = checkMatch(field);
    const cleanedField = [...field.map(el => [...el])];
    machesIndexes.map(
        (i) => {
            cleanedField[i[0]][i[1]] = 0
        }
    )
    return cleanedField
}
