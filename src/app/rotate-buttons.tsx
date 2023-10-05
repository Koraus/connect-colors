import { useRecoilState } from "recoil";
import { rotateFigure } from "../level-model/rotate-figure";
import { gameFiguresRecoil } from "./playing-data";
import { Rotate90DegreesCcw } from "@emotion-icons/material/Rotate90DegreesCcw";

export function RotateButtons() {

    const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
    return <div>{[2, 1, 0].map((i) =>
        <button
            style={{
                fontSize: "14px",
                marginBottom: "0.3rem",
                display: "flex",
                alignItems: "center",
                borderRadius: "0.3rem",
            }}
            key={i}
            onClick={() => {
                setGameFigures(gameFigures.map(
                    (el, j) => i === j ? rotateFigure(el) : el,
                ));
            }}>
            Rotate {i}&nbsp;
            <span style={{ display: "inline-block", height: "1.5em" }} >
                <Rotate90DegreesCcw height={"100%"} />
            </span>
        </button>)
    }</div >;
}