import { playingFieldRecoil } from './data-recoil/playing-data';
import { FieldCell } from './field-cell';
import { useRecoilState, useRecoilValue } from 'recoil';
import { figureOnPointerIndexRecoil, gameFiguresRecoil } from './data-recoil/playing-data';
import { canPlaceFigureInCoords } from "./can-place-figureIn-coords";
import { fieldWithDestroyedMatches } from './field-with-destroyed-matches';
import { calculateScore } from './calculate-score';


export const PlayingField = () => {

  const sideShift = 2;

  const playingField = useRecoilValue(playingFieldRecoil).field;
  const cellSize = [0.3, 0.3, 0.2];
  const gap = 0.03;

  const [pointerFigureIndex, setPointerFigureIndex] = useRecoilState(figureOnPointerIndexRecoil);
  const [field, setField] = useRecoilState(playingFieldRecoil);
  const gameFigures = useRecoilValue(gameFiguresRecoil);

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

      setField({
        field: fieldWithFigure,
        score: field.score,
        prev: { field: field.field, score: field.score }
      })
      setTimeout(() => {
        setField({
          field: fieldWithDestroyedMatches(fieldWithFigure),
          score: field.score + calculateScore(fieldWithFigure),
          prev: { field: field.field, score: field.score }
        })
      }, 20)
    }
  }

  const cells = playingField.map((el, index1) => {

    return [el.map((el, index) => {
      const position = [
        ((cellSize[0] + gap) * index) - sideShift,
        index1 * (cellSize[1] + gap),
        0
      ]

      return (
        <FieldCell
          value={el}
          key={index}
          coords={[index1, index]}
          position={[position[0], position[1], position[2]]}
          size={cellSize}
          putPointerFigure={putPointerFigure}
        />
      )
    })]
  });

  return <group>
    {cells}
  </group>;
};
