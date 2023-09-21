import { Color } from 'three';
import { RoundedBox } from '@react-three/drei';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color, figureGhostCoordsRecoil, figureOnPointerIndexRecoil, gameFiguresRecoil, playingFieldRecoil } from './data-recoil/playing-data';
import { isAvailableMove } from "./is-available-move";
import { canPlaceFigureInCoords } from "./can-place-figureIn-coords";
import { destroyIdenticalCells } from './destroy-identical-cells';


export const FieldCell = ({
  value, position, size, coords
}: {
  value: number; position: [number, number, number]; size: number[], coords?: [number, number]
}) => {

  const setFigureCoords = useSetRecoilState(figureGhostCoordsRecoil);

  const [pointerFigureIndex, setPointerFigureIndex] = useRecoilState(figureOnPointerIndexRecoil);
  const [field, setField] = useRecoilState(playingFieldRecoil);
  const gameFigures = useRecoilValue(gameFiguresRecoil);

  let cellColor = new Color(color[value]);

  if (!isAvailableMove(gameFigures, field) && value === 0) {
    cellColor = new Color("#ff0000");
  }


  const putPointerFigure = (coords: [number, number] | undefined) => {
    if (!coords) return
    if (pointerFigureIndex === undefined) return

    const pointerFigure = gameFigures[pointerFigureIndex]
    const [x, y] = coords;

    const fieldWithFigure = [...field.map(el => [...el])];

    if (pointerFigure && canPlaceFigureInCoords(pointerFigure, field, coords)) {
      for (let i = 0; i < pointerFigure?.length; i++) {
        for (let j = 0; j < pointerFigure[i].length; j++) {
          if (pointerFigure[i][j] !== 0) {
            fieldWithFigure[x + i][y + j] = pointerFigure[i][j]
          }
        }
      }
      setPointerFigureIndex(undefined)
      setField(fieldWithFigure)

    }
    destroyIdenticalCells(fieldWithFigure, setField)
  }

  return (
    <mesh
      position={position}
      onPointerUp={() => { putPointerFigure(coords); }}
      onPointerOver={() => setFigureCoords(
        pointerFigureIndex !== undefined
          ? [
            position[0],
            position[1],
            position[2],
          ]
          : [0, 0, 0])
      }
    >
      <RoundedBox args={[size[0], size[1], size[2]]}>
        <meshLambertMaterial attach="material" color={cellColor} />
      </RoundedBox>
    </mesh >
  );
};