import { AtomEffect, atom } from "recoil";

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
    default: [0, 0, 0] as [number, number, number]
})


const localStorageEffect = (key: string): AtomEffect<number> => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const bestScoreRecoil = atom({
    key: 'bestScore',
    default: 0,
    effects: [
        localStorageEffect('best_score'),
    ]
});

export const cellColors = ['#b7b7b7', '#6AA6FF', '#fa7fe9', '#4ee63a']

export const cellSize = [0.3, 0.3, 0.2];

export const cellGap = 0.08;

export const isSounOnRecoil = atom({
    key: 'isSoundOn',
    default: true,
});