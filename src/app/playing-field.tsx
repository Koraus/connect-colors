import { cellSize, cellGap, bestScoreRecoil } from "./playing-data";
import { playingFieldRecoil } from "./playing-data";
import { FieldCell } from "./field-cell";
import { useRecoilState, useRecoilValue } from "recoil";
import { figureOnPointerIndexRecoil, gameFiguresRecoil } from "./playing-data";
import { canPlaceFigureInCoords } from "../model/can-place-figure-in-coords";
import { fieldWithDestroyedMatches } from "../model/field-with-destroyed-matches";
import { calculateScore } from "../model/calculate-score";
import { generateGameFigure } from "../model/generate-game-figure";
import { useEffect, useState } from "react";
import { isAvailableMove } from "../model/is-available-move";


export const PlayingField = () => {

  const sideShift = 2.5;

  const playingField = useRecoilValue(playingFieldRecoil).field;

  const [pointerFigureIndex, setPointerFigureIndex] = useRecoilState(figureOnPointerIndexRecoil);
  const [field, setField] = useRecoilState(playingFieldRecoil);
  const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
  const [bestScore, setBestScore] = useRecoilState(bestScoreRecoil);

  const putPointerFigure = (coords: [number, number] | undefined) => {

    if (!coords) return;
    if (pointerFigureIndex === undefined) return;

    const pointerFigure = gameFigures[pointerFigureIndex];
    const [x, y] = coords;

    const fieldWithFigure = [...field.field.map(el => [...el])];

    if (pointerFigure && canPlaceFigureInCoords(pointerFigure, field.field, coords)) {
      for (let i = 0; i < pointerFigure?.length; i++) {
        for (let j = 0; j < pointerFigure[i].length; j++) {
          if (pointerFigure[i][j] !== 0) {
            fieldWithFigure[x + i][y + j] = pointerFigure[i][j];
          }
        }
      }

      setGameFigures(gameFigures.map(
        (el, index) => {
          if (index === pointerFigureIndex) {
            const lvl = index === 0 ? 1 : index === 1 ? 2 : 3;
            return generateGameFigure(lvl);
          } else { return el; }
        }));

      setPointerFigureIndex(undefined);

      setField({
        field: fieldWithFigure,
        score: field.score,
        prevMove: { field: field.field, score: field.score },
      });

      setTimeout(() => {
        setField({
          field: fieldWithDestroyedMatches(fieldWithFigure),
          score: field.score + calculateScore(fieldWithFigure),
          prevMove: { field: field.field, score: field.score },
        });
        setBestScore(Math.max(bestScore, field.score + calculateScore(fieldWithFigure)));
      }, 20);
    }
  };

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setGameOver(!isAvailableMove(gameFigures, field.field));
  }, [field]);

  const cells = playingField.map((el, index1) => {

    return [el.map((el, index) => {
      const position = [
        ((cellSize[0] + cellGap) * index) - sideShift,
        index1 * (cellSize[1] + cellGap),
        0,
      ];


      return (
        <FieldCell
          gameOver={gameOver}
          value={el}
          key={index}
          coords={[index1, index]}
          position={[position[0], position[1], position[2]]}
          size={cellSize}
          putPointerFigure={putPointerFigure}
        />
      );
    })];
  });

  return <group>{cells}</group>;
};
