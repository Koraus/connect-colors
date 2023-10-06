import { atom } from "recoil";
import { tuple } from "../../utils/tuple";


export const figureRotationsRecoil = atom({
    key: "figureRotations",
    default: tuple(0, 0, 0),
});
