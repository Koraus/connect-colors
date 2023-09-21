import { SetterOrUpdater } from "recoil";
import { checkMatch } from "./check-match"

export const destroyIdenticalCells = (
    field: number[][], setField: SetterOrUpdater<number[][]>
) => {

    const machesIndexes = checkMatch(field);
    const cleanedField = [...field.map(el => [...el])];
    machesIndexes.map(
        (i) => {
            cleanedField[i[0]][i[1]] = 0
        }
    )
    setField(cleanedField)
}
