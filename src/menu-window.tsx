import { Dispatch, SetStateAction } from "react";
import { PlayFill } from "@emotion-icons/bootstrap/PlayFill";
import { useRecoilState, useRecoilValue } from "recoil";
import { bestScoreRecoil, isSounOnRecoil, playingFieldRecoil } from "./data-recoil/playing-data";
import { Sound } from "@emotion-icons/entypo/Sound";
import { SoundMute } from "@emotion-icons/entypo/SoundMute";
import { ResetBtn } from "./reset-btn";


export const MenuWindow = ({
    isOpen, setIsOpen
}: {
    isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {

    const btnStyle = {
        fontSize: "18px",
        borderRadius: "0.3em",
        padding: "2em 2em",
        marginBottom: "1rem",
        width: "30%"
    }

    const [isSoundOn, setIsSoundOn] = useRecoilState(isSounOnRecoil)
    const crtScore = useRecoilValue(playingFieldRecoil).score;
    const bestScore = useRecoilValue(bestScoreRecoil)

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
            }}
        >
            <div
                style={{
                    width: "70vw",
                    height: "90vh",
                    padding: "1rem",
                    backgroundColor: "rgba(67, 199, 255, 0.9)",
                    borderRadius: "0.3rem",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <h1 style={{ textAlign: "center", marginTop: "0" }}>Menu</h1>
                <h2 style={{ textAlign: "center", marginTop: "0" }}>Current score: {crtScore}</h2>
                <h2 style={{ textAlign: "center", marginTop: "0" }}>Best score: {bestScore}</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    style={btnStyle}
                >
                    <span style={{ display: "inline-block", height: "1.5em", }} >
                        Return <PlayFill height={"100%"} />
                    </span>
                </button >
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
                </button >
                <ResetBtn style={btnStyle} clothMenue={setIsOpen} />



            </div>

        </div >
    )
}
