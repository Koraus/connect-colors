import { canPlaceFigureInCoords } from "./can-place-figureIn-coords";
import { Figure } from "./data-recoil/playing-data";
import { rotateFigure } from "./rotate-figure";


export const isAvailableMove = (availableFigures: Figure[], field: number[][]) => {

    const allVariantsOfFigures = availableFigures.map((figure) => {
        const arr = Array.from({ length: 4 }, () => undefined);
        return arr.map((e, i) => rotateFigure(figure, i));
    }
    ).flat() as Figure[];

    const allFieldCoords = field

        .map((e, i) => e.map(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (e, i1) => [i, i1])).flat() as [number, number][];

    return allVariantsOfFigures
        .some(figure => allFieldCoords
            .some(coord => canPlaceFigureInCoords(figure, field, coord)
            ))

};
