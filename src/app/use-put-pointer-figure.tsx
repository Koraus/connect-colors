import { bestScoreRecoil, levelsRecoil } from "./playing-data";
import { playingFieldRecoil } from "./playing-data";
import { useRecoilState } from "recoil";
import { gameFiguresRecoil } from "./playing-data";
import { croppingModeOnPlacementRecoil } from "./cropping-mode-on-placement-recoil";
import { actOnLevelState } from "../level-model";
import { levelRecoil } from "./level/level-recoil";



export const usePutPointerFigure = () => {
  const [level, setLevel] = useRecoilState(levelRecoil);

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
    const action = {
      action: "putFigure",
      coords,
      figureIndex: pointerFigureIndex,
      figureRotation: 0,
      isCroppingActive,
    } as Parameters<typeof actOnLevelState>[1];
    const actionResult = actOnLevelState({
      ...level.state,
      field: field.field,
      figures: gameFigures,
      score: field.score,
      figureStockLeft: levels[0].stockCounter,
    }, action);
    if (!actionResult[0]) {
      console.error(actionResult[1]);
      return;
    }
    const [, state, transition] = actionResult;

    console.log("transition", state.figures);

    setLevel({
      prev: level,
      state,
      transition,
      action,
    });

    setIsCroppingActive(false);


    setLevels(levels.map((lvl) => {
      if (lvl.level === 1) {
        return {
          ...lvl,
          stockCounter: state.figureStockLeft,
          isCompleted: state.figureStockLeft === 0,
          currentScore: state.score,
        };
      }
      return { ...lvl };
    }));

    setGameFigures(state.figures);

    setField({
      field: transition.fieldWithFigure,
      score: field.score,
      prevMove: { field: field.field, score: field.score },
    });

    setTimeout(() => {
      setField({
        field: state.field,
        score: state.score,
        prevMove: { field: field.field, score: field.score },
      });
      setBestScore(Math.max(bestScore, state.score));
    }, 20);
  };
};
