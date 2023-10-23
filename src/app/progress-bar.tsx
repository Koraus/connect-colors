import { useRecoilValue } from "recoil";
import icoPath from "../assets/figures-icon.png"
import { levelRecoil } from "./level/level-recoil";


export const ProgressBar = () => {
    const level = useRecoilValue(levelRecoil);
    return (
        <div css={{
            userSelect: "none",
            boxSizing: "border-box",
            borderRadius: "1.5vmax",
            border: "0.3vmax solid #E4E4E4",
            background: "gray",
            padding: "0.8vmax",
            width: "21vmax",
            fontWeight: "bold",
            fontSize: "2.6vmax",
            color: "#E4E4E4",
            position: "fixed",
            right: "2vmax",
            bottom: "2vmax",
        }}>
            <div css={{
                posiiton: "reletive",
                display: "flex",
                alignItems: "center",
                justifyContent: "spaceEvenly",
            }}>
                <img
                    draggable={false}
                    src={icoPath}
                    style={{ width: "9vmax", marginRight: "1vmax" }}
                    alt="figures"
                />
                <span> {level.state.level.figureStock - level.state.figureStockLeft}&nbsp; </span>
                <span> / {level.state.level.figureStock}</span>

                <div css={{
                    zIndex: -1,
                    borderRadius: "1vmax",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: "linear-gradient(90deg, #49B5F7 0%, #2578CF 100%)",
                    transitionDuration: "500ms",
                    width: `${(level.state.level.figureStock - level.state.figureStockLeft) / level.state.level.figureStock * 100}%`,
                    height: "100%",
                }}> </div>

            </div>

        </div>
    )
}
