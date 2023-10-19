import { useRecoilValue } from "recoil";
import icoPath from "../assets/figures-icon.png"
import { levelRecoil } from "./level/level-recoil";


export const ProgressBar = () => {
    const level = useRecoilValue(levelRecoil);
    return (
        <div style={{
            boxSizing: "border-box",
            borderRadius: "1.5vmax",
            border: "0.3vmax solid #E4E4E4",
            background: "linear-gradient(90deg, #49B5F7 0%, #2578CF 100%)",
            padding: "0.8vmax",
            width: "21vmax",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "3vmax",
            color: "#E4E4E4",
            position: "fixed",
            right: "2vmax",
            bottom: "2vmax",
        }}>
            <span>  {level.state.figureStockLeft} </span> <span> / {level.state.level.figureStock}</span>
            <img
                draggable={false}
                src={icoPath}
                style={{ width: "9vmax" }}
                alt="" />
        </div>
    )
}
