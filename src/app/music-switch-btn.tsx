import { useRecoilState, useRecoilValue } from "recoil";
import soundOnIcon from "../assets/sound-on.svg"
import soundOffIcon from "../assets/sound-off.svg"
import { isSoundOnRecoil } from "./settings/is-sound-on-recoil";

export const MusicSwitchBtn = () => {

    const [isSound, setIsSound] = useRecoilState(isSoundOnRecoil);

    return (
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
                right: "2vmax",
                top: "2vmax",
            }}
            onClick={
                () => setIsSound(!isSound)
            }
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
                    src={isSound ? soundOffIcon : soundOnIcon}
                    alt="icon"
                    style={{
                        display: "block",
                        width: "4.5vmax",

                    }}
                />
            </div>
        </button>
    );
};
