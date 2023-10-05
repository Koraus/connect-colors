import { bestScoreRecoil, levelsRecoil } from "./playing-data";
import { playingFieldRecoil } from "./playing-data";
import { useRecoilState } from "recoil";
import { gameFiguresRecoil } from "./playing-data";
import { canPlaceFigureInCoords } from "../model/can-place-figure-in-coords";
import { fieldWithDestroyedMatches } from "../model/field-with-destroyed-matches";
import { calculateScore } from "../model/calculate-score";
import { generateGameFigure } from "../model/generate-game-figure";
import { croppingModeOnPlacementRecoil } from "./cropping-mode-on-placement-recoil";



export const usePutPointerFigure = () => {
  const [field, setField] = useRecoilState(playingFieldRecoil);
  const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
  const [bestScore, setBestScore] = useRecoilState(bestScoreRecoil);

  const [levels, setLevels] = useRecoilState(levelsRecoil);

  const [isCroppingActive, setIsCroppingActive] = useRecoilState(croppingModeOnPlacementRecoil)

  return ({
    pointerFigureIndex,
    coords,
  }: {
    pointerFigureIndex: number,
    coords: [number, number]
  }) => {
    const pointerFigure = gameFigures[pointerFigureIndex];
    const [x, y] = coords;

    const fieldWithFigure = [...field.field.map(el => [...el])];

    if (isCroppingActive && pointerFigure) {
      for (let i = 0; i < pointerFigure?.length; i++) {
        for (let j = 0; j < pointerFigure[i].length; j++) {
          if (pointerFigure[i][j] === 0) { continue }
          if (field.field[x + i][y + j] === 0) {
            fieldWithFigure[x + i][y + j] = pointerFigure[i][j]
          } else {
            fieldWithFigure[x + i][y + j] = fieldWithFigure[x + i][y + j]
          }
        }
      }
      setIsCroppingActive(false)
    }

    if (!isCroppingActive
      && pointerFigure
      && canPlaceFigureInCoords(pointerFigure, field.field, coords)) {
      for (let i = 0; i < pointerFigure?.length; i++) {
        for (let j = 0; j < pointerFigure[i].length; j++) {
          if (pointerFigure[i][j] !== 0) {
            fieldWithFigure[x + i][y + j] = pointerFigure[i][j];
          }
        }
      }
    }

    setLevels(
      levels.map(
        (lvl) => {
          //if current level
          console.log(lvl.level, lvl.stockCounter)
          if (lvl.level === 1 && lvl.stockCounter === 1) {
            return {
              ...lvl,
              stockCounter: lvl.stockCounter - 1,
              isCompleted: true,
              currentScore: lvl.currentScore + calculateScore(fieldWithFigure)
            }
          }
          if (lvl.level === 1 && lvl.stockCounter > 1) {
            return {
              ...lvl,
              stockCounter: lvl.stockCounter - 1,
              currentScore: lvl.currentScore + calculateScore(fieldWithFigure)
            }
          }
          return { ...lvl }
        }
      )
    )

    //levels[0] is current level
    if (levels[0].stockCounter > 3) {
      setGameFigures(gameFigures.map(
        (el, index) => {
          if (index === pointerFigureIndex) {
            const lvl = index === 0 ? "0" : index === 1 ? "1" : "2";
            return generateGameFigure(lvl, Math.random);
          } else { return el; }
        }));
    }

    if (levels[0].stockCounter <= 3) {
      setGameFigures(gameFigures.filter(
        (el, index) => index !== pointerFigureIndex)
      )
    }

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
