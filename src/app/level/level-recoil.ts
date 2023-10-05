import { atom } from "recoil";
import { LevelAction, LevelState, LevelTransition, createLevelState } from "../../model/level";
import { levels } from "../../model/levels";


export type LevelStateChain = {
    prev: LevelStateChain;
    action: LevelAction;
    transition: LevelTransition;
    state: LevelState;
} | {
    state: LevelState;
}


export const levelRecoil = atom({
    key: "level",
    default: {
        state: createLevelState({
            seed32: Math.random() * (1 << 32) >>> 0,
            level: levels["1"],
        }),
    } as LevelStateChain,
});