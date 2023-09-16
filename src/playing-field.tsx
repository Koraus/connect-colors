import { Vector3 } from 'three';
import { useRecoilValue } from 'recoil';
import { playingFieldRecoil } from './data-recoil/playing-data';
import { Cell } from './Cell';

export const PlayingField = () => {

  const rowLength = 10;
  const playingField = useRecoilValue(playingFieldRecoil);
  const cellSize = [0.3, 0.3, 0.2];
  const gape = 0.03;

  const cells = playingField.map((el, index) => {
    const row = Math.floor(index / rowLength);
    const column = index % rowLength;
    const position = new Vector3(
      ((cellSize[0] + gape) * column),
      row * (cellSize[1] + gape), 0
    );
    return <Cell
      value={el}
      key={index}
      position={position}
      size={cellSize} />;
  }
  );
  return cells;
};
