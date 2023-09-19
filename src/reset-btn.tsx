import { useResetRecoilState } from "recoil";
import { figureCoordsRecoil, gameFiguresRecoil, heldFigureRecoil, playingFieldRecoil } from "./data-recoil/playing-data";


export const ResetBtn = () => {

    const resetFiedl = useResetRecoilState(playingFieldRecoil);
    const resetFigure = useResetRecoilState(gameFiguresRecoil);
    const resetHeldFigure = useResetRecoilState(heldFigureRecoil);
    const resetFigureCoords = useResetRecoilState(figureCoordsRecoil);


    const setReset = () => {
        resetFiedl()
        resetFigure()
        resetHeldFigure()
        resetFigureCoords()
    }

    return <button onClick={() => {
        setReset()
    }}>reset</button>
}





