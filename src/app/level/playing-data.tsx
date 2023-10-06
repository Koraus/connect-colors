import { atom } from "recoil";
import { localStorageAtomEffect } from "../../utils/local-storage-atom-effect";


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
