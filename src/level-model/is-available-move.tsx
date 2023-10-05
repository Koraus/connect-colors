import { canPlaceFigureInCoords } from "./can-place-figure-in-coords";
import { Figure } from "./figure";
import { rotateFigure } from "./rotate-figure";


export const isAvailableMove = (availableFigures: Figure[], field: number[][]) => {

    const allVariantsOfFigures = availableFigures.map((figure) => {
        const arr = Array.from({ length: 4 }, () => undefined);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return arr.map((e, i) => rotateFigure(figure, i));
    },
    ).flat() as Figure[];

    const allEmptyFieldCoords = field
        .map((e, i) => e.map(
            (e, i1) => e === 0 ? [i, i1] : [])).flat() as [number, number][];

    return allVariantsOfFigures
        .some(figure => allEmptyFieldCoords
            .some(coord => canPlaceFigureInCoords(figure, field, coord),
            ));

};
