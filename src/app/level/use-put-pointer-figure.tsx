import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./pointer-data";
import { bestScoreRecoil } from "../best-score-recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { croppingModeOnPlacementRecoil } from "./cropping-mode-on-placement-recoil";
import { levelRecoil } from "./level-recoil";
import { figureRotationsRecoil } from "./figure-rotations-recoil";
import { refKey } from "../../utils/ref-key";
import { putPreviewRecoil } from "./put-preview-recoil";

export const usePutPointerFigure = () => {
    const [level, setLevel] = useRecoilState(levelRecoil);
    const [bestScore, setBestScore] = useRecoilState(bestScoreRecoil);
    const { action, actionResult } = useRecoilValue(putPreviewRecoil);
    const setFigureRotations = useSetRecoilState(figureRotationsRecoil);
    const setIsCroppingActive = useSetRecoilState(croppingModeOnPlacementRecoil);
    const setPointerFigureIndex = useSetRecoilState(figureOnPointerIndexRecoil);
    const setFigureCoords = useSetRecoilState(figureGhostCoordsRecoil);

    return () => {
        if (!actionResult[0]) {
            console.error(actionResult[1]);
            return;
        }
        const [, state, transition] = actionResult;

        setFigureRotations(figureRotations => (Object.fromEntries(state.figures.map((f, i) => {
            const key = refKey(f);
            return [key, figureRotations[key]];
        }))));

        setLevel({
            prev: level,
            state,
            transition,
            action,
        });

        setIsCroppingActive(false);
        setPointerFigureIndex(undefined);
        setFigureCoords([0, 0]);
        setBestScore(Math.max(bestScore, state.score));
    };
};
