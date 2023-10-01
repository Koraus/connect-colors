import { useRecoilState, useRecoilValue } from "recoil";
import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./playing-data";
import { Figure } from "../model/figure";
import { CellDecoration } from "./cell-decoration";



export const GameFigure = ({ ctrGameFigure, sequenceNumber, figureIndex,
}: {
    ctrGameFigure: Figure, sequenceNumber: number, figureIndex: number
}) => {
    const [pointerFigureIndex, setPointerFigureIndex] =
        useRecoilState(figureOnPointerIndexRecoil);

    const isGhost = figureIndex === pointerFigureIndex;

    const [xItem, yItem] = useRecoilValue(figureGhostCoordsRecoil);
    const [xGhost, yGhost] = isGhost
        ? [xItem, yItem]
        : [-4, sequenceNumber * 4];

    return <group
        position={[xGhost, 0.05, yGhost]}

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
                    position={[i, 0, j]}
                    isGhost={isGhost}
                />))}
    </group>;
};
