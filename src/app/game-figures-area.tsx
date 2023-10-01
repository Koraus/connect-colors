import { useRecoilValue } from "recoil";
import { gameFiguresRecoil } from "./playing-data";
import { GameFigure } from "./game-figure";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";

export const GameFiguresArea = () => {
    const gameFigures = useRecoilValue(gameFiguresRecoil);

    const { camera } = useThree();
    useLayoutEffect(() => camera.lookAt(-0.2, 1.2, 0), [camera]);

    return gameFigures.map((el, index) => {
        return <GameFigure
            key={index}
            ctrGameFigure={el}
            sequenceNumber={index % 3}
            figureIndex={index}
        />
    })
}
