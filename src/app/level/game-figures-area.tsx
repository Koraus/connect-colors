import { useRecoilValue } from "recoil";
import { GameFigure } from "./game-figure";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { levelRecoil } from "./level-recoil";
import memoize from "memoizee";

const refId = memoize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (ref: unknown) =>
        Math.random());

export const GameFiguresArea = () => {
    const level = useRecoilValue(levelRecoil);

    const { camera } = useThree();
    useLayoutEffect(() => camera.lookAt(3, 0, 4), [camera]);

    return level.state.figures.map((el, index) => <group
        key={refId(el)}
        position={[-4, 0, index * 4]}
    >
        <GameFigure
            figureIndex={index}
        />
    </group>);
};
