import { FAST_CHECK, actPutFigure } from "./act-put-figure";


export const isAvailablePut = (
    state: Parameters<typeof actPutFigure>[0],
) => {
    const {
        field,
        figures,
    } = state;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            for (let fi = 0; fi < figures.length; fi++) {
                for (let r = 0; r < 4; r++) {
                    const [ok] = actPutFigure(state, {
                        coords: [i, j],
                        figureIndex: fi,
                        figureRotation: r,
                        isCroppingActive: false,
                        isOverlayActive: false,
                    }, FAST_CHECK);
                    if (ok) { return true; }
                }
            }
        }
    }
    return false;
};
