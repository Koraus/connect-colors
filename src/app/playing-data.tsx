import { atom } from "recoil";
import { localStorageAtomEffect } from "../utils/local-storage-atom-effect";
import { Figure } from "../model/figure";
import { generateGameFigure } from "../model/generate-game-figure";


export const playingFieldRecoil = atom({
    key: "playingField",
    default: {
        field:
            [
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
                Array.from({ length: 10 }, () => 0),
            ],
        score: 0,
        prevMove: undefined as undefined | {
            field: number[][],
            score: number,
        },
    },
});

export const gameFiguresRecoil = atom({
    key: "gameFigures",
    default: [
        generateGameFigure(3),
        generateGameFigure(2),
        generateGameFigure(1),
    ] as Figure[],
});

export const figureOnPointerIndexRecoil = atom({
    key: "figureOnPointerIndex",
    default: undefined as number | undefined,
});

export const figureGhostCoordsRecoil = atom({
    key: "figureGhostCoords",
    default: [0, 0] as [number, number],
});

export const bestScoreRecoil = atom({
    key: "bestScore",
    default: 0,
    effects: [
        localStorageAtomEffect(),
    ],
});

export const isSounOnRecoil = atom({
    key: "isSoundOn",
    default: true,
    effects: [
        localStorageAtomEffect(),
    ],
});

export const gameDecorationsRecoil = atom({
    key: "gameDecorations",
    default: "figures" as "simple" | "figures",
    effects: [
        localStorageAtomEffect(),
    ],
});

export const levelsRecoil = atom({
    key: "levels",
    default: [{
        level: 1,
        stock: 10,
        stockCounter: 10,
        isCompleted: false,
        currentScore: 0,
        bestScore: 0,
    }, {
        level: 2,
        stock: 13,
        stockCounter: 13,
        isCompleted: false,
        currentScore: 0,
        bestScore: 0,
    },
    ]
});
