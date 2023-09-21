import { useRecoilState, useRecoilValue } from "recoil"
import { Figure, figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./data-recoil/playing-data"
import { Cell } from "./Cell"
import { Vector3 } from "three";


export const GameFigure = ({ ctrGameFigure, sequenceNumber, figureIndex,
}: {
    ctrGameFigure: Figure, sequenceNumber: number, figureIndex: number
}) => {

    const cellSize = [0.3, 0.3, 0.2];
    const gap = 0.03;

    const [pointerFigureIndex, setPointerFigureIndex] =
        useRecoilState(figureOnPointerIndexRecoil);

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
            : [1.5, sequenceNumber * 1.2, 0]


    return (
        <group
            position={new Vector3(xGhost, yGhost, zGhost)}
            onPointerDown={() => {
                setPointerFigureIndex(figureIndex);
            }} >
            {oneFiguraСells}
        </group >)

}