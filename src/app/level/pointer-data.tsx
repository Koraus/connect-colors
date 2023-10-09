import { atom } from "recoil";


export const figureOnPointerIndexRecoil = atom({
    key: "figureOnPointerIndex",
    default: undefined as number | undefined,
});

export const figureGhostCoordsRecoil = atom({
    key: "figureGhostCoords",
    default: undefined as [number, number] | undefined,
});


