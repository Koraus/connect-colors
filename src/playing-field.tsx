import { cellSize, cellGap, playingFieldRecoil, bestScoreRecoil } from './data-recoil/playing-data';
import { FieldCell } from './field-cell';
import { useRecoilState, useRecoilValue } from 'recoil';
import { figureOnPointerIndexRecoil, gameFiguresRecoil } from './data-recoil/playing-data';
import { canPlaceFigureInCoords } from "./can-place-figureIn-coords";
import { fieldWithDestroyedMatches } from './field-with-destroyed-matches';
import { calculateScore } from './calculate-score';


export const PlayingField = () => {

  const sideShift = 2.5;

  const playingField = useRecoilValue(playingFieldRecoil).field;

  const [pointerFigureIndex, setPointerFigureIndex] = useRecoilState(figureOnPointerIndexRecoil);
  const [field, setField] = useRecoilState(playingFieldRecoil);
  const gameFigures = useRecoilValue(gameFiguresRecoil);
  const [bestScore, setBestScore] = useRecoilState(bestScoreRecoil)

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
        prevMove: { field: field.field, score: field.score }
      })

      setTimeout(() => {
        setField({
          field: fieldWithDestroyedMatches(fieldWithFigure),
          score: field.score + calculateScore(fieldWithFigure),
          prevMove: { field: field.field, score: field.score }
        })
        setBestScore(Math.max(bestScore, field.score + calculateScore(fieldWithFigure)))
      }, 20)
    }
  }

  const cells = playingField.map((el, index1) => {

    return [el.map((el, index) => {
      const position = [
        ((cellSize[0] + cellGap) * index) - sideShift,
        index1 * (cellSize[1] + cellGap),
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
