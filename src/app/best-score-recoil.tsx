import { atom } from "recoil";
import { localStorageAtomEffect } from "../utils/local-storage-atom-effect";


export const bestScoreRecoil = atom({
    key: "bestScore",
    default: 0,
    effects: [
        localStorageAtomEffect(),
    ],
});
