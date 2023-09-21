import { useResetRecoilState, useSetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil, gameFiguresRecoil, playingFieldRecoil } from "./data-recoil/playing-data";

export const FieldSizeInput = () => {

    const setField = useSetRecoilState(playingFieldRecoil);
    const resetFigure = useResetRecoilState(gameFiguresRecoil);
    const resetHeldFigure = useResetRecoilState(figureOnPointerIndexRecoil);
    const resetFigureCoords = useResetRecoilState(figureGhostCoordsRecoil);

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const size = Number(e.target.value);
        const field = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
        setField(field);
        resetFigure()
        resetHeldFigure()
        resetFigureCoords()

    }
    return (
        <div onChange={onChangeValue}>
            <input type="radio" value="4" name="fieldSize" /> 4x4
            <input type="radio" value="6" name="fieldSize" /> 6x6
            <input type="radio" value="10" name="fieldSize" /> 10x10
        </div>
    );

}