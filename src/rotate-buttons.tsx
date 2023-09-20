import { useRecoilState } from "recoil";
import { rotateFigure } from "./rotate-figure";
import { gameFiguresRecoil } from "./data-recoil/playing-data";



export function RotateButtons() {

    const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
    return <div>{[0, 1, 2].map((i) => <button onClick={() => {
        setGameFigures(gameFigures.map(
            (el, j) => i === j ? rotateFigure(el) : el
        ))
    }}>rotate {i}</button>)}</div>
}