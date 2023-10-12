import { Dispatch, SetStateAction } from "react";
import { PlayFill } from "@emotion-icons/bootstrap/PlayFill";
import { useRecoilState, useRecoilValue } from "recoil";
import { bestScoreRecoil } from "./best-score-recoil";
import { isSoundOnRecoil } from "./settings/is-sound-on-recoil";
import { gameDecorationsRecoil } from "./settings/game-decorations-recoil";
import { Sound } from "@emotion-icons/entypo/Sound";
import { SoundMute } from "@emotion-icons/entypo/SoundMute";
import { ResetBtn } from "./level/reset-btn";
import { levelRecoil } from "./level/level-recoil";


export const MenuWindow = ({
    isOpen, setIsOpen,
}: {
    isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const level = useRecoilValue(levelRecoil);

    const btnStyle = {
        fontSize: "18px",
        borderRadius: "0.3em",
        padding: "2em 2em",
        marginBottom: "1rem",
        width: "30%",
    };

    const [isSoundOn, setIsSoundOn] = useRecoilState(isSoundOnRecoil);
    const crtScore = level.state.score;
    const bestScore = useRecoilValue(bestScoreRecoil);
    const [decorations, setDecorations] = useRecoilState(gameDecorationsRecoil);
    return (
        isOpen && <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                zIndex: 100,
                inset: 0,
                backgroundColor: "rgba(122, 127, 132, 0.61)",
                pointerEvents: "all",
            }}
            onClick={() => setIsOpen(false)}
        >
            <div
                style={{
                    width: "40vw",
                    height: "90vh",
                    padding: "1rem",
                    backgroundColor: "rgba(67, 199, 255, 0.9)",
                    borderRadius: "0.3rem",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h1 style={{ textAlign: "center", marginTop: "0" }}>Menu</h1>
                <h2 style={{ textAlign: "center", marginTop: "0" }}>Current score: {crtScore}</h2>
                <h2 style={{ textAlign: "center", marginTop: "0" }}>Best score: {bestScore}</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    style={btnStyle}
                >
                    <span style={{ display: "inline-block", height: "1.5em" }}>
                        Return <PlayFill height={"100%"} />
                    </span>
                </button>
                <button
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    style={btnStyle}
                >
                    <span style={{
                        display: "inline-block", height: "1.5em",
                    }} > Sound On&nbsp;
                        {isSoundOn ? < Sound height={"100%"} /> :
                            <SoundMute height={"100%"} />}
                    </span>
                </button>
                <ResetBtn style={btnStyle} clothMenue={setIsOpen} />
                <div>
                    <p style={{ textAlign: "center" }}> Choose game scenery: </p>
                    <button
                        disabled={decorations === "simple"}
                        onClick={() => setDecorations("simple")}
                        style={{
                            fontSize: "16px",
                            width: "10em",
                            padding: "2em",
                            borderRadius: "0.3rem",
                            marginRight: "1rem",
                        }}>Simple </button>
                    <button onClick={() => setDecorations("figures")}
                        disabled={decorations === "figures"}
                        style={{
                            fontSize: "16px",
                            width: "10em",
                            padding: "2em",
                            borderRadius: "0.3rem",
                        }}>Figures</button>
                </div>
                <h3 style={{ marginBottom: 0 }}>Hot keys:</h3>
                <p> Cancel selection : " Esc " / Rotate the figure : " r " </p>
            </div>
        </div>
    );
};
