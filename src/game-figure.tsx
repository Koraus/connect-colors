import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { Figure, figureCoordsRecoil, gameFiguresRecoil, heldFigureRecoil } from "./data-recoil/playing-data"
import { Cell } from "./Cell"
import { Vector3 } from "three";
import { RoundedBox } from "@react-three/drei";
import { useState } from "react";


export const GameFigure = ({ ctrGameFigure, sequenceNumber, figureIndex
}: {
    ctrGameFigure: Figure, sequenceNumber: number, figureIndex: number
}) => {

    const cellSize = [0.3, 0.3, 0.2];
    const gap = 0.03;

    const [figure, setFigure] = useState(ctrGameFigure)
    const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
    const setPointerFigure = useSetRecoilState(heldFigureRecoil);

    const rotateFigure = (figure: Figure) => {
        const numRows = figure.length;
        const numCols = figure[0].length;

        const rotatedTable = new Array(numCols)
            .fill(null)
            .map(() => new Array(numRows).fill(null));

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                rotatedTable[col][numRows - row - 1] = figure[row][col];
            }
        }
        setFigure(rotatedTable)
    }

    const oneFiguraСells = figure.map((el, index1) => {

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
                    coords={[index1, index]}
                    position={position}
                    size={cellSize} />
            )
        })]
    });

    const [xItem, yItem, zItem] = useRecoilValue(figureCoordsRecoil);

    return (
        // фігура з конопкою
        <group position={new Vector3(1, sequenceNumber * 1.2, 0)}>
            <mesh
                // кнопка
                position={[1, 1, 0]}
                onClick={() => {
                    rotateFigure(figure)
                    const newFigures = gameFigures.map(
                        (el, i) => i === figureIndex ? figure : el
                    );
                    setGameFigures(newFigures)
                }}>
                <RoundedBox args={[0.2, 0.1, 0.1]}>
                    <meshLambertMaterial attach="material" color={"#aaff99"} />
                </RoundedBox>
            </mesh>
            <group
                position={new Vector3(xItem, yItem, zItem)}
                onClick={() => {
                    setPointerFigure(ctrGameFigure);
                }} >
                {oneFiguraСells}
            </group >
        </group >)

}