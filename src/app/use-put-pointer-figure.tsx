import { bestScoreRecoil } from "./playing-data";
import { playingFieldRecoil } from "./playing-data";
import { useRecoilState } from "recoil";
import { figureOnPointerIndexRecoil, gameFiguresRecoil } from "./playing-data";
import { canPlaceFigureInCoords } from "../model/can-place-figure-in-coords";
import { fieldWithDestroyedMatches } from "../model/field-with-destroyed-matches";
import { calculateScore } from "../model/calculate-score";
import { generateGameFigure } from "../model/generate-game-figure";



export const usePutPointerFigure = () => {
  const [pointerFigureIndex, setPointerFigureIndex] = useRecoilState(figureOnPointerIndexRecoil);
  const [field, setField] = useRecoilState(playingFieldRecoil);
  const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
  const [bestScore, setBestScore] = useRecoilState(bestScoreRecoil);

  return (coords: [number, number] | undefined) => {

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
};
