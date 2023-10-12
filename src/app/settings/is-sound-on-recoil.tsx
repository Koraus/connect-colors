import { atom } from "recoil";
import { localStorageAtomEffect } from "../../utils/local-storage-atom-effect";


export const isSoundOnRecoil = atom({
    key: "isSoundOn",
    default: true,
    effects: [
        localStorageAtomEffect(),
    ],
});
