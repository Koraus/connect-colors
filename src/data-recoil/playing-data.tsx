import { atom } from "recoil";

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
        prev: {
            field: undefined as number[][] | undefined,
            score: undefined as number | undefined,
        }
    }
});

export type Figure = number[][];

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
    default: [1, 0, 0.5] as [number, number, number]
})

export const bestScoreRecoil = atom({
    key: 'bestScore',
    default: 0
})

export const cellColors = ['#b7b7b7', '#6AA6FF', '#fa7fe9', '#4ee63a']