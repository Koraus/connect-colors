import { useResetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, gameFiguresRecoil, figureOnPointerIndexRecoil, playingFieldRecoil } from "./data-recoil/playing-data";
import { Refresh } from "@emotion-icons/evil/Refresh";

export const ResetBtn = () => {

    const resetFiedl = useResetRecoilState(playingFieldRecoil);
    const resetFigure = useResetRecoilState(gameFiguresRecoil);
    const resetHeldFigure = useResetRecoilState(figureOnPointerIndexRecoil);
    const resetFigureCoords = useResetRecoilState(figureGhostCoordsRecoil);

    const reset = () => {
        resetFiedl()
        resetFigure()
        resetHeldFigure()
        resetFigureCoords()
    }

    return <button
        onClick={() => { reset() }}
        style={{
            fontSize: "14px",
            height: '2em',
            borderRadius: "0.3rem",
        }}
    > Reset &nbsp;
        <span style={{ display: "inline-block", height: "1.5em" }} >
            <Refresh size={"100%"} />
        </span>
    </button>
}





