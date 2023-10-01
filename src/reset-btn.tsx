import { useResetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, gameFiguresRecoil, figureOnPointerIndexRecoil, playingFieldRecoil } from "./data-recoil/playing-data";
import { Refresh } from "@emotion-icons/evil/Refresh";
import { CSSProperties } from "react";

export const ResetBtn = ({ style, clothMenue
}: {
    style?: CSSProperties, clothMenue?: (isOpen: boolean) => void | undefined
}) => {

    const resetField = useResetRecoilState(playingFieldRecoil);
    const resetFigure = useResetRecoilState(gameFiguresRecoil);
    const resetHeldFigure = useResetRecoilState(figureOnPointerIndexRecoil);
    const resetFigureCoords = useResetRecoilState(figureGhostCoordsRecoil);

    const reset = () => {
        resetField()
        resetFigure()
        resetHeldFigure()
        resetFigureCoords()
    }
    const btnStyle = style ? style : {
        fontSize: "14px",
        height: '2em',
        borderRadius: "0.3rem",
    }

    return <button
        onClick={
            () => {
                reset();
                if (clothMenue) { clothMenue(false) }
            }
        }
        style={btnStyle}
    > Reset &nbsp;
        <span style={{ display: "inline-block", height: "1.5em" }} >
            <Refresh height={"100%"} />
        </span>
    </button>
}





