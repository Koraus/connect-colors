import { Vector3 } from 'three';
import { useRecoilValue } from 'recoil';
import { playingFieldRecoil } from './data-recoil/playing-data';
import { FieldCell } from './field-cell';


export const PlayingField = () => {

  const sideShift = 2;

  const playingField = useRecoilValue(playingFieldRecoil);
  const cellSize = [0.3, 0.3, 0.2];
  const gap = 0.03;

  const cells = playingField.map((el, index1) => {

    return [el.map((el, index) => {
      const position = new Vector3(
        ((cellSize[0] + gap) * index) - sideShift,
        index1 * (cellSize[1] + gap),
        0
      );

      return (
        <FieldCell
          value={el}
          key={index}
          coords={[index1, index]}
          position={[position.x, position.y, position.z]}
          size={cellSize} />
      )
    })]
  });

  return <group>
    {cells}
  </group>;
};
