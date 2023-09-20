import { atom } from "recoil";

export const playingFieldRecoil = atom({
    key: 'playingField',
    default: [
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
    ]
});

export type Figure = number[][];

export const gameFiguresRecoil = atom<Figure[]>({
    key: 'gameFigures',
    default: [
        [
            [0, 2, 1],
            [1, 3, 0],
            [1, 2, 0],
        ],
        [
            [2, 3, 0],
            [1, 2, 3],
        ],
        [
            [1, 2],
            [1, 1],
        ]
    ]
});

export const figureOnPointerIndexRecoil = atom({
    key: 'figureOnPointerIndex',
    default: undefined as number | undefined

});

export const figureGhostCoordsRecoil = atom({
    key: 'figureGhostCoords',
    default: [0, 0, 0] as [number, number, number]
})

export const color = ['#b7b7b7', '#6AA6FF', '#fa7fe9', '#4ee63a']