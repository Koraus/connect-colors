import { LevelState } from ".";
import { createRandomMulberry32 } from "../utils/create-random-mulberry32";
import { weightedRandom01 } from "../utils/weighted-random";
import { calculateScore } from "./calculate-score";
import { destroyMatches } from "./destroy-matches";
import { generateGameFigure } from "./generate-game-figure";
import { rotatedFigure } from "./rotated-figure";
import { tuple } from "../utils/tuple";

export const NO_CHECK = 0;
export const FAST_CHECK = 100;
export const DETAILED_CHECK = 200;

export const actPutFigure = (state: LevelState, action: {
    coords: [number, number],
    figureIndex: number,
    figureRotation: number,
    isCroppingActive: boolean,
    isOverlayActive: boolean,
}, checkLevel = DETAILED_CHECK) => {
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
        isOverlayActive,
    } = action;

    if (checkLevel > NO_CHECK) {
        if (state.figureStockLeft < 1) {
            return tuple(false as const, {
                reason: "out-of-figures" as const,
            });
        }
    }

    const figure = rotatedFigure(figures[figureIndex], figureRotation);

    const [x, y] = coords;
    const conflicts = [] as [number, number][];
    const fieldWithFigure = structuredClone(field);
    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure[i].length; j++) {
            fieldWithFigure[x + i][y + j] = figure[i][j];

            if (checkLevel > NO_CHECK) {
                const f0 = figure[i][j];
                const f1 = field[x + i][y + j];
                if (f1 === undefined) {
                    conflicts.push([x + i, y + j]);
                    if (checkLevel > FAST_CHECK) {
                        return tuple(false as const, {
                            reason: "out-of-field" as const,
                            conflicts,
                        });
                    }
                }
                if (f0 === 0 || f1 === 0) { continue; }
                if (f0 === f1 && isOverlayActive) { continue; }
                if (!isCroppingActive) {
                    conflicts.push([x + i, y + j]);
                    if (checkLevel > FAST_CHECK) {
                        return tuple(false as const, {
                            reason: "out-of-field" as const,
                            conflicts,
                        });
                    }
                }
            }
        }
    }
    if (checkLevel > NO_CHECK) {
        if (conflicts.length > 0) {
            return tuple(false as const, {
                reason: "cannot-put-figure" as const,
                conflicts,
            });
        }
    }

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
