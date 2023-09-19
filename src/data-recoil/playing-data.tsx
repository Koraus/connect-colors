import { atom } from "recoil";
import { Vector3 } from "three";

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

type Figure = number[][];

export const gameFiguresRecoil = atom<Figure[]>({
    key: 'gameFigure',
    default: [
        [
            [0, 1, 1],
            [1, 1, 0],
            [1, 1, 0],
        ]
    ]
});

export const heldFigureRecoil = atom<Figure | null>({
    key: 'heldFigure',
    default: null
});

export const figureCoordsRecoil = atom<Vector3>({
    key: 'figureCoords',
    default: new Vector3(2, 0, 0)
})