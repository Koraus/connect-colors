import { useRecoilState } from "recoil";
import { rotateFigure } from "./rotate-figure";
import { gameFiguresRecoil } from "./data-recoil/playing-data";


export function RotateButtons() {

    const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
    return <div>{[2, 1, 0].map((i) =>
        <button
            style={{ display: "block", marginBottom: "0.3rem" }}
            key={i}
            onClick={() => {
                setGameFigures(gameFigures.map(
                    (el, j) => i === j ? rotateFigure(el) : el
                ))
            }}>rotate {i}</button>)}</div>
}