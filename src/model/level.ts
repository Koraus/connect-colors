import { createRandomMulberry32 } from "../utils/create-random-mulberry32";
import { weightedRandom01 } from "../utils/weighted-random";
import { Figure } from "./figure";
import { generateGameFigure } from "./generate-game-figure";
import { levels } from "./levels";


export type CellColor = 0 | 1 | 2 | 3;

export type LevelState = {
    seed32: number;
    level: typeof levels[string];
    field: CellColor[][];
    figures: Figure[];
    figureStockLeft: number;
    score: number;
}

export type LevelTransition = {
    //
};

export type LevelAction = {
    action: "putFigure",
    figureIndex: number,
    figureRotation: number,
    isCropActive: boolean,
} | {
    action: "clearColors",
    value: CellColor,
};


export const createLevelState = ({
    seed32,
    level,
}: {
    seed32: number;
    level: typeof levels[string];
}): LevelState => {
    const random32 = createRandomMulberry32(seed32);
    const random01 = () => random32() / (1 << 32);

    if (level.figureStock < 3) {
        throw new Error("level.figureStock must be >= 3");
    }

    const figures = [
        generateGameFigure(
            weightedRandom01(
                level.figureDifficulties,
                random01),
            random01),
    ];

    return {
        seed32: random32(),
        level,
        field: level.fieldMap.map(row => row.map(() => 0)),
        figures,
        figureStockLeft: level.figureStock,
        score: 0,
    };
};

export const actOnLevelState = (
    state: LevelState,
    action: LevelAction,
): [LevelTransition, LevelState] => {
    // todo: implement
    return [{}, state];
}