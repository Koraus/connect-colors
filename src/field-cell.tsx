import { Color } from 'three';
import { RoundedBox } from '@react-three/drei';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color, figureGhostCoordsRecoil, figureOnPointerIndexRecoil, gameFiguresRecoil, playingFieldRecoil } from './data-recoil/playing-data';
import { isAvailableMove } from "./is-available-move";
import { canPlaceFigureInCoords } from "./can-place-figureIn-coords";
import { fieldWithDestroyedMatches } from './field-with-destroyed-matches';
import { calculateScore } from './calculate-score';


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

  if (!isAvailableMove(gameFigures, field.field) && value === 0) {
    cellColor = new Color("#ff0000");
  }

  const putPointerFigure = (coords: [number, number] | undefined) => {
    if (!coords) return
    if (pointerFigureIndex === undefined) return

    const pointerFigure = gameFigures[pointerFigureIndex]
    const [x, y] = coords;

    const fieldWithFigure = [...field.field.map(el => [...el])];

    if (pointerFigure && canPlaceFigureInCoords(pointerFigure, field.field, coords)) {
      for (let i = 0; i < pointerFigure?.length; i++) {
        for (let j = 0; j < pointerFigure[i].length; j++) {
          if (pointerFigure[i][j] !== 0) {
            fieldWithFigure[x + i][y + j] = pointerFigure[i][j]
          }
        }
      }
      setPointerFigureIndex(undefined)
      setField({ field: fieldWithFigure, score: field.score })

    }
    setField({
      field: fieldWithDestroyedMatches(fieldWithFigure),
      score: field.score + calculateScore(fieldWithFigure)
    })
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