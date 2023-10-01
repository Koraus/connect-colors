import { atom } from "recoil";
import { localStorageAtomEffect } from "../utils/local-storage-atom-effect";
import { Figure } from "../model/figure";


export const playingFieldRecoil = atom({
    key: 'playingField',
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
        }
    }
});

export const gameFiguresRecoil = atom({
    key: 'gameFigures',
    default: [
        [
            [0, 2, 1, 1],
            [1, 3, 3, 2],
            [1, 2, 0, 2],
        ],
        [
            [0, 3],
            [3, 1],

        ],
        [
            [0, 2],
            [1, 1],
        ]
    ] as Figure[]
});

export const figureOnPointerIndexRecoil = atom({
    key: 'figureOnPointerIndex',
    default: undefined as number | undefined

});

export const figureGhostCoordsRecoil = atom({
    key: 'figureGhostCoords',
    default: [0, 0, 0] as [number, number, number]
})

export const bestScoreRecoil = atom({
    key: 'bestScore',
    default: 0,
    effects: [
        localStorageAtomEffect(),
    ]
});

export const cellColors = ['#b7b7b7', '#6AA6FF', '#fa7fe9', '#4ee63a']

export const cellSize = [0.3, 0.3, 0.1] as [number, number, number];

export const cellGap = 0.08;

export const isSounOnRecoil = atom({
    key: 'isSoundOn',
    default: true,
    effects: [
        localStorageAtomEffect(),
    ]
});

export const gameDecorationsRecoil = atom({
    key: 'gameDecorations',
    default: "figures" as "simple" | "figures",
    effects: [
        localStorageAtomEffect(),
    ]
});