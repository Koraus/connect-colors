import { atom } from "recoil";

export const playingFieldRecoil = atom({
    key: 'playingField',
    default: Array.from(
        { length: 100 },
        // () => Math.floor(Math.random() * 5),
        () => 0,
    ),
});

export const gameFigureRecoil = atom({
    key: 'gameFigure',
    default: [
        0, 0, 2, 0,
        0, 1, 1, 0,
        0, 0, 1, 0,
        0, 0, 0, 0,
    ]
});


export const movingFigure = atom({
    key: 'movingFigure',
    default: null
});