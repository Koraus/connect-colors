import { useMemo, useState } from "react";
import randomIcon from "../assets/random-level.svg"
import { useRecoilState } from "recoil";
import { LevelStateChain, levelRecoil } from "./level/level-recoil";
import { createLevelState } from "../level-model";
import { levels } from "../level-model/levels";
import { css } from "@emotion/react";
import { isAvailablePut } from "../level-model/is-available-move";
import { WinScene } from "./win-scene";

export const RandomLevelBtn = () => {

    const [level, setLevel] = useRecoilState(levelRecoil)
    const [isWarning, setIsWarning] = useState(false)
    const isWin = useMemo(() => level.state.figureStockLeft === 0, [level]);
    const isLose = useMemo(() => !isAvailablePut(level.state), [level]);

    return (
        <div>
            {isWin && <WinScene />}
            {isWarning && <div style={{
                boxSizing: "border-box",
                position: "fixed",
                textAlign: "center",
                padding: "2vmax",
                borderRadius: "1.2vmax",
                background: "linear-gradient(33deg, rgb(200 230 248) 0%, rgb(91 171 255) 100%)",
                top: "calc(50% - 6vmax)",
                left: "calc(50% - 12vmax)",
            }}> Want to continue? progress will be lost <br />
                <button
                    style={{
                        fontSize: "1.2rem",
                        boxSizing: "border-box",
                        borderRadius: "1.2vmax",
                        border: "none",
                        padding: "1vmax",
                        margin: "1vmax",
                    }
                    }
                    css={css`
                    background: linear-gradient(90deg, #49B5F7 0%, #2578CF 100%);
                    &:hover {  
                        background: linear-gradient(90deg, #2ba8f7 0%, #014996 100%);
                        color: white; 
                    } `}

                    onClick={() => {
                        setIsWarning(false);
                        setLevel({
                            state: createLevelState({
                                seed32: Math.random() * (1 << 32) >>> 0,
                                level: levels["1"],
                            }),
                        } as LevelStateChain)
                    }}
                > Yes(&#10003;)  </button>
                <button
                    style={{
                        fontSize: "1.2rem",
                        boxSizing: "border-box",
                        borderRadius: "1.2vmax",
                        border: "none",
                        padding: "1vmax",
                        margin: "1vmax",
                    }}
                    css={css`
                    background: linear-gradient(90deg, #49B5F7 0%, #2578CF 100%);
                    &:hover {  
                        background: linear-gradient(90deg, #2ba8f7 0%, #014996 100%);
                        color: white; 
                    } `}
                    onClick={() => setIsWarning(false)}> No (X) </button>
            </div>}
            {isLose && !isWin && < div style={{
                background: "radial-gradient(#e74949, #494847)",
                opacity: 0.5,
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
            }}> </div>}
            <button
                style={{
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    borderRadius: "1.5vmax",
                    border: "0.3vmax solid #E4E4E4",
                    background: "linear-gradient(180deg, #2587E2 0%, #1A4C69 100%)",
                    padding: "0.5vmax",
                    width: "fit-content",
                    position: "fixed",
                    transitionDelay: "1s",
                    transitionDuration: "1500ms",
                    left: isWin || isLose ? "calc(50% - 4.5vmax - 0.3vmax - 0.5vmax)" : "2vmax",
                    top: isWin || isLose ? "calc(50% - 4.5vmax - 0.3vmax - 0.5vmax)" : "2vmax",
                    transform: isWin || isLose ? "scale(2)" : "none",
                    zIndex: isWin || isLose ? 10 : 1,
                }}
                onClick={() => {
                    if (isWin || isLose) {
                        return setLevel({
                            state: createLevelState({
                                seed32: Math.random() * (1 << 32) >>> 0,
                                level: levels["1"],
                            }),
                        } as LevelStateChain)
                    }
                    return setIsWarning(true)
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
                        alt="random lvl"
                        style={{
                            display: "block",
                            width: "4.5vmax",
                        }}
                    />
                </div>
            </button >
        </div >
    );
};
