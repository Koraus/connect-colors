import { useResetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, gameFiguresRecoil, figureOnPointerIndexRecoil, playingFieldRecoil, isAvailableMoveRecoil } from "./data-recoil/playing-data";


export const ResetBtn = () => {

    const resetFiedl = useResetRecoilState(playingFieldRecoil);
    const resetFigure = useResetRecoilState(gameFiguresRecoil);
    const resetHeldFigure = useResetRecoilState(figureOnPointerIndexRecoil);
    const resetFigureCoords = useResetRecoilState(figureGhostCoordsRecoil);
    const resetAvailableMove = useResetRecoilState(isAvailableMoveRecoil);

    const setReset = () => {
        resetFiedl()
        resetFigure()
        resetHeldFigure()
        resetFigureCoords()
        resetAvailableMove()
    }

    return <button onClick={() => {
        setReset()
    }}>reset</button>
}





