import { Color } from 'three';
import { RoundedBox } from '@react-three/drei';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color, figureGhostCoordsRecoil, figureOnPointerIndexRecoil, gameFiguresRecoil, playingFieldRecoil } from './data-recoil/playing-data';
import { canPlaceFigureInCoords, checkMatch } from './check-match';


export const FieldCell = ({
  value, position, size, coords
}: {
  value: number; position: [number, number, number]; size: number[], coords?: [number, number]
}) => {
  const cellColor = new Color(color[value]);

  const setFigureCoords = useSetRecoilState(figureGhostCoordsRecoil);

  const [pointerFigureIndex, setPointerFigureIndex] = useRecoilState(figureOnPointerIndexRecoil);
  const [field, setField] = useRecoilState(playingFieldRecoil);
  const gameFigures = useRecoilValue(gameFiguresRecoil);


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
      checkMatch(field)
    }

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