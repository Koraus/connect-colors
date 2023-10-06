import { useSetRecoilState } from "recoil";
import { Rotate90DegreesCcw } from "@emotion-icons/material/Rotate90DegreesCcw";
import { figureRotationsRecoil } from "./figure-rotations-recoil";
import update from "immutability-helper";

export function RotateButtons() {
    const setFigureRotations = useSetRecoilState(figureRotationsRecoil);

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
                setFigureRotations(figureRotations => update(figureRotations, {
                    [i]: { $set: (figureRotations[i] + 1) % 4 },
                }));
            }}>
            Rotate {i}&nbsp;
            <span style={{ display: "inline-block", height: "1.5em" }} >
                <Rotate90DegreesCcw height={"100%"} />
            </span>
        </button>)
    }</div >;
}