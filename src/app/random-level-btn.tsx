import { useState } from "react";
import randomIcon from "../assets/random-level.svg"
import { useSetRecoilState } from "recoil";
import { LevelStateChain, levelRecoil } from "./level/level-recoil";
import { createLevelState } from "../level-model";
import { levels } from "../level-model/levels";

export const RandomLevelBtn = () => {

    const setLevel = useSetRecoilState(levelRecoil)

    const [isWarning, setIsWarning] = useState(false)
    const [isYesHovering, setIsYesHovering] = useState(false);
    const [isNoHovering, setIsNoHovering] = useState(false);

    return (
        <div>
            {isWarning && <div style={{
                boxSizing: "border-box",
                position: "fixed",
                zIndex: 100,
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
                        background: isYesHovering
                            ? "linear-gradient(90deg, #58b8f4 0%, #6895c5 100%)"
                            : "linear-gradient(90deg, #49B5F7 0%, #2578CF 100%)",
                        padding: "1vmax",
                        margin: "1vmax",
                    }}
                    onMouseEnter={() => setIsYesHovering(true)}
                    onMouseLeave={() => setIsYesHovering(false)}
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
                        background: isNoHovering
                            ? "linear-gradient(90deg, #58b8f4 0%, #6895c5 100%)"
                            : "linear-gradient(90deg, #49B5F7 0%, #2578CF 100%)",
                        padding: "1vmax",
                        margin: "1vmax",
                    }}
                    onMouseEnter={() => setIsNoHovering(true)}
                    onMouseLeave={() => setIsNoHovering(false)}
                    onClick={() => setIsWarning(false)}> No (X) </button>
            </div>}
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
                    left: "2vmax",
                    top: "2vmax",
                }}
                onClick={() => setIsWarning(true)}
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
        </div>
    );
};
