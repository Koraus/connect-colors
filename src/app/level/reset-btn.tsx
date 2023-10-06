import { useResetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./playing-data";
import { Refresh } from "@emotion-icons/evil/Refresh";
import { CSSProperties } from "react";
import { levelRecoil } from "./level-recoil";
import { figureRotationsRecoil } from "./figure-rotations-recoil";

export const ResetBtn = ({ style, clothMenue,
}: {
    style?: CSSProperties, clothMenue?: (isOpen: boolean) => void | undefined
}) => {

    const resetField = useResetRecoilState(levelRecoil);
    const resetFigure = useResetRecoilState(figureRotationsRecoil);
    const resetHeldFigure = useResetRecoilState(figureOnPointerIndexRecoil);
    const resetFigureCoords = useResetRecoilState(figureGhostCoordsRecoil);

    return <button
        onClick={
            () => {
                resetField();
                resetFigure();
                resetHeldFigure();
                resetFigureCoords();
                if (clothMenue) { clothMenue(false); }
            }
        }
        style={style ? style : {
            fontSize: "14px",
            height: "2em",
            borderRadius: "0.3rem",
        }}
    > Reset &nbsp;
        <span style={{ display: "inline-block", height: "1.5em" }} >
            <Refresh height={"100%"} />
        </span>
    </button>;
};





