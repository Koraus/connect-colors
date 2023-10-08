import { useRecoilValue, useSetRecoilState } from "recoil";
import { Rotate90DegreesCcw } from "@emotion-icons/material/Rotate90DegreesCcw";
import { figureRotationsRecoil } from "./figure-rotations-recoil";
import update from "immutability-helper";
import { levelRecoil } from "./level-recoil";
import { refKey } from "../../utils/ref-key";

export function RotateButtons() {
    const level = useRecoilValue(levelRecoil);
    const setFigureRotations = useSetRecoilState(figureRotationsRecoil);

    return <div>{level.state.figures.map((f, i) => {
        const key = refKey(f);
        return <button
            style={{
                fontSize: "14px",
                marginBottom: "0.3rem",
                display: "flex",
                alignItems: "center",
                borderRadius: "0.3rem",
            }}
            key={key}
            onClick={() => {
                setFigureRotations(figureRotations => update(figureRotations, {
                    [key]: { $set: ((figureRotations[key] ?? 0) + 1) % 4 },
                }));
            }}>
            Rotate {i}&nbsp;
            <span style={{ display: "inline-block", height: "1.5em" }}>
                <Rotate90DegreesCcw height={"100%"} />
            </span>
        </button>;
    })
    }</div >;
}