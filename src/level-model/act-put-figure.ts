import { LevelState } from ".";
import { createRandomMulberry32 } from "../utils/create-random-mulberry32";
import { weightedRandom01 } from "../utils/weighted-random";
import { calculateScore } from "./calculate-score";
import { destroyMatches } from "./destroy-matches";
import { generateGameFigure } from "./generate-game-figure";
import { putFigure } from "./putFigure";
import { rotateFigure } from "./rotate-figure";
import { tuple } from "../utils/tuple";
import { canPutFigure } from "./can-put-figure";


export const actPutFigure = (state: LevelState, action: {
    coords: [number, number];
    figureIndex: number;
    figureRotation: number;
    isCroppingActive: boolean;
}) => {
    const {
        seed32,
        level,
        figureStockLeft,
        field,
        figures,
    } = state;
    const {
        coords,
        figureIndex,
        figureRotation,
        isCroppingActive,
    } = action;

    if (state.figureStockLeft < 1) {
        return tuple(false as const, {
            reason: "out-of-figures" as const,
        });
    }

    const figure = rotateFigure(figures[figureIndex], figureRotation);

    if (!canPutFigure({ field, figure, coords, isCroppingActive })) {
        return tuple(false as const, {
            reason: "cannot-put-figure" as const,
        });
    }

    const fieldWithFigure = putFigure({ field, figure, coords, isCroppingActive });

    const scoreToAdd = calculateScore(fieldWithFigure);

    const random32 = createRandomMulberry32(seed32);
    const random01 = () => random32() / 0x100000000;
    const figures1 = figures.slice();
    if (figureStockLeft > 3) {
        figures1[figureIndex] = generateGameFigure(
            weightedRandom01(
                level.figureDifficulties,
                random01),
            random01);
    } else {
        figures1.splice(figureIndex, 1);
    }

    const fieldWithDestroyedMatches = destroyMatches(fieldWithFigure);

    return tuple(true as const, {
        ...state,
        seed32: random32(),
        field: fieldWithDestroyedMatches,
        figures: figures1,
        figureStockLeft: figureStockLeft - 1,
        score: state.score + scoreToAdd,
    }, {
        fieldWithFigure,
    });
};
