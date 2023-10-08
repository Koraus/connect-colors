import { atom } from "recoil";


export const figureRotationsRecoil = atom({
    key: "figureRotations",
    default: {} as Record<number, number | undefined>,
});
