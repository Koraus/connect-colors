import { useRecoilState, useRecoilValue } from "recoil"
import { Figure, figureGhostCoordsRecoil, gameFiguresRecoil, figureOnPointerIndexRecoil } from "./data-recoil/playing-data"
import { Cell } from "./Cell"
import { Vector3 } from "three";
import { RoundedBox } from "@react-three/drei";
import { rotateFigure } from "./rotate-figure";


export const GameFigure = ({ ctrGameFigure, sequenceNumber, figureIndex,
}: {
    ctrGameFigure: Figure, sequenceNumber: number, figureIndex: number
}) => {

    const cellSize = [0.3, 0.3, 0.2];
    const gap = 0.03;

    const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
    const [pointerFigureIndex, setPointerFigureIndex] = useRecoilState(figureOnPointerIndexRecoil);

    const oneFiguraСells = ctrGameFigure.map((el, index1) => {

        return [el.map((el, index) => {
            const position = new Vector3(
                ((cellSize[0] + gap) * index),
                index1 * (cellSize[1] + gap),
                0
            );
            return (el === 0 ? null :
                <Cell
                    value={el}
                    key={index}
                    position={position}
                    size={cellSize} />
            )
        })]
    });

    const [xItem, yItem, zItem] = useRecoilValue(figureGhostCoordsRecoil);
    const [xGhost, yGhost, zGhost] =
        figureIndex === pointerFigureIndex
            ? [xItem, yItem, zItem]
            : [0, 0, 0]


    return (
        <group position={new Vector3(1.5, sequenceNumber * 1.2, 0)}>
            <mesh
                position={[1, 0.8, 0]}
                onClick={() => {
                    const rotatedFigure = rotateFigure(ctrGameFigure)
                    const newFigures = gameFigures.map(
                        (el, i) => i === figureIndex ? rotatedFigure : el
                    );
                    setGameFigures(newFigures)
                }}>
                <RoundedBox args={[0.2, 0.1, 0.1]}>
                    <meshLambertMaterial attach="material" color={"#aaff99"} />
                </RoundedBox>
            </mesh>
            <group
                position={new Vector3(xGhost, yGhost, zGhost)}
                onPointerDown={() => {
                    setPointerFigureIndex(figureIndex);
                    console.log('click', pointerFigureIndex)
                }} >
                {oneFiguraСells}
            </group >
        </group >)

}