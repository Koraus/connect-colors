import { atom } from "recoil";
import { localStorageAtomEffect } from "../../utils/local-storage-atom-effect";


export const gameDecorationsRecoil = atom({
    key: "gameDecorations",
    default: "figures" as "simple" | "figures",
    effects: [
        localStorageAtomEffect(),
    ],
});
