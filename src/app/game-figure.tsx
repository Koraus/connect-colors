import { useRecoilState, useRecoilValue } from "recoil"
import { cellGap, cellSize, figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./playing-data";
import { Figure } from "../model/figure";
import { CellDecoration } from "./cell-decoration";



export const GameFigure = ({ ctrGameFigure, sequenceNumber, figureIndex,
}: {
    ctrGameFigure: Figure, sequenceNumber: number, figureIndex: number
}) => {
    const [pointerFigureIndex, setPointerFigureIndex] =
        useRecoilState(figureOnPointerIndexRecoil);

    const isGhost = figureIndex === pointerFigureIndex;

    const currentCellSize = isGhost
        ? [cellSize[0] - 0.02, cellSize[1] - 0.02, cellSize[2] + 0.15]
        : cellSize;
    const currentGap = isGhost ? (cellGap + 0.02) : cellGap;

    const [xItem, yItem, zItem] = useRecoilValue(figureGhostCoordsRecoil);
    const [xGhost, yGhost, zGhost] = isGhost
        ? [xItem, yItem, zItem]
        : [1.5, sequenceNumber * 1.5, 0];

    return <group
        position={[xGhost, yGhost, zGhost + 0.05]}

        onPointerDown={() => {
            setPointerFigureIndex(figureIndex);
        }}
    >
        {ctrGameFigure.map((el, i) => el.map((el, j) =>
            el === 0
                ? null
                : <CellDecoration
                    key={`${i}_${j}`}
                    value={el}
                    position={[
                        (currentCellSize[0] + currentGap) * j,
                        i * (currentCellSize[1] + currentGap),
                        0.02,
                    ]}
                    isGhost={isGhost}
                />))}
    </group>;
}
