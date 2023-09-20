import { useRecoilValue } from "recoil";
import { gameFiguresRecoil } from "./data-recoil/playing-data";
import { GameFigure } from "./game-figure";

export const GameFiguresArea = () => {
    const gameFigures = useRecoilValue(gameFiguresRecoil);

    return gameFigures.map((el, index) => {
        return <GameFigure
            key={index}
            ctrGameFigure={el}
            sequenceNumber={index % 3}
            figureIndex={index}
        />
    })
}
