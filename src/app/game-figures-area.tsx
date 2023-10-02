import { useRecoilValue } from "recoil";
import { gameFiguresRecoil } from "./playing-data";
import { GameFigure } from "./game-figure";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";

export const GameFiguresArea = () => {
    const gameFigures = useRecoilValue(gameFiguresRecoil);

    const { camera } = useThree();
    useLayoutEffect(() => camera.lookAt(3, 0, 4), [camera]);

    return gameFigures.map((el, index) => <group
        key={index}
        position={[-4, 0, index * 4]}
    >
        <GameFigure
            figureIndex={index}
        />
    </group>);
};
