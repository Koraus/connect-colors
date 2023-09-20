import { useRecoilValue } from "recoil";
import { gameFiguresRecoil } from "./data-recoil/playing-data";
import { GameFigure } from "./game-figure";
import { Vector3 } from "three";

export const GameFiguresArea = () => {
    const gameFigures = useRecoilValue(gameFiguresRecoil);
    return (
        <group position={new Vector3(0.5, 0, 0)}>
            {gameFigures.map((el, index) => {
                return <GameFigure
                    key={index}
                    ctrGameFigure={el}
                    sequenceNumber={index % 3}
                    figureIndex={index}
                />
            })}
        </group>
    );
}