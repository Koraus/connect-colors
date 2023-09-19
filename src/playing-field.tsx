import { Vector3 } from 'three';
import { useRecoilValue } from 'recoil';
import { playingFieldRecoil } from './data-recoil/playing-data';
import { FieldCell } from './field-cell';


export const PlayingField = () => {

  const sideShift = 2;

  const playingField = useRecoilValue(playingFieldRecoil);
  const cellSize = [0.3, 0.3, 0.2];
  const gape = 0.03;

  const cells = playingField.map((el, index1) => {

    return [el.map((el, index) => {
      const position = new Vector3(
        ((cellSize[0] + gape) * index) - sideShift,
        index1 * (cellSize[1] + gape),
        0
      );

      return (
        <FieldCell
          value={el}
          key={index}
          coords={[index1, index]}
          position={position}
          size={cellSize} />
      )
    })]
  });

  return <group>
    {cells}
  </group>;
};
