export const fieldWithoutCellsOfTheSameType = (field: number[][], cellValue: number) => {
    return field.map((row) => {
        return row.map(
            (cell) => {
                if (cell === cellValue) {
                    return 0
                }
                return cell
            }
        )
    })
}
