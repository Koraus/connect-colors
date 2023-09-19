import { Color, Vector3 } from 'three';
import { RoundedBox } from '@react-three/drei';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { figureCoordsRecoil, heldFigureRecoil, playingFieldRecoil } from './data-recoil/playing-data';


export const FieldCell = ({
  value, position, size, coords
}: {
  value: number; position: Vector3; size: number[], coords?: [number, number]
}) => {
  const color = new Color(
    value === 0 ? '#b7b7b7'
      : value === 1 ? '#6AA6FF'
        : value === 2 ? '#fa7fe9'
          : value === 3 ? '#4ee63a' : '#bae4e4'
  );

  const pointerFigure = useRecoilValue(heldFigureRecoil);
  const [field, setField] = useRecoilState(playingFieldRecoil);

  const putPointerFigure = (coords: [number, number] | undefined) => {
    if (!coords) return
    const [x, y] = coords;

    const fieldWithFigure = [...field.map(el => [...el])];

    let canPut = true;

    if (pointerFigure) {
      for (let i = 0; i < pointerFigure?.length; i++) {
        for (let j = 0; j < pointerFigure[i].length; j++) {
          if (field[x + i][y + j] !== 0 && pointerFigure[i][j] !== 0
            || x + i > 9 || y + j > 9 || x + i < 0 || y + j < 0) {
            canPut = false
            console.log('cant put')
            return
          }
        }
      }
    }

    if (pointerFigure && canPut) {
      for (let i = 0; i < pointerFigure?.length; i++) {
        for (let j = 0; j < pointerFigure[i].length; j++) {
          if (pointerFigure[i][j] !== 0) {
            console.log(pointerFigure[i][j])
            fieldWithFigure[x + i][y + j] = pointerFigure[i][j]
          }
        }
      }
    }
    setField(fieldWithFigure)
  }

  const setFigureCoords = useSetRecoilState(figureCoordsRecoil);

  return (
    <mesh
      position={position}
      onPointerUp={() => { putPointerFigure(coords) }}
      onPointerOver={() => { setFigureCoords(pointerFigure ? position : new Vector3(2, 0, 0)) }}
    >
      <RoundedBox args={[size[0], size[1], size[2]]}>
        <meshLambertMaterial attach="material" color={color} />
      </RoundedBox>
    </mesh >
  );
};