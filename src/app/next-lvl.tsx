import { useSetRecoilState } from "recoil";
import randomIcon from "../assets/random-level.svg"
import { LevelStateChain, levelRecoil } from "./level/level-recoil";
import { createLevelState } from "../level-model";
import { levels } from "../level-model/levels";

export const NextLvl = () => {
    const setLevel = useSetRecoilState(levelRecoil)
    return (
        <button
            style={{
                transform: " scale(1.7)",
                fontSize: "1rem",
                boxSizing: "border-box",
                borderRadius: "1.5vmax",
                border: "0.3vmax solid #E4E4E4",
                background: "linear-gradient(180deg, #2587E2 0%, #1A4C69 100%)",
                padding: "0.5vmax",
                width: "fit-content",
                height: "fit-content",
                position: "fixed",
                top: "calc(50% - 4.5vmax - 0.3vmax - 0.5vmax)",
                left: "calc(50% - 4.5vmax - 0.3vmax - 0.5vmax)",
            }}
            onClick={() => {
                setLevel({
                    state: createLevelState({
                        seed32: Math.random() * (1 << 32) >>> 0,
                        level: levels["1"],
                    }),
                } as LevelStateChain)
            }}
        >
            <div style={{
                boxSizing: "border-box",
                background: "linear-gradient(90deg, #49B5F7 0%, #2578CF 100%)",
                borderRadius: "1vmax",
                padding: "0.4vmax",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} >
                <img
                    draggable={false}
                    src={randomIcon}
                    alt="next"
                    style={{
                        display: "block",
                        width: "4.5vmax",
                    }}
                />
            </div>
        </button>
    );
};
