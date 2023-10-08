import { atom } from "recoil";


export const figureOnPointerIndexRecoil = atom({
    key: "figureOnPointerIndex",
    default: undefined as number | undefined,
});

export const figureGhostCoordsRecoil = atom({
    key: "figureGhostCoords",
    default: [0, 0] as [number, number],
});


