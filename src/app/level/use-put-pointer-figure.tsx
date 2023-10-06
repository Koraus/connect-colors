import { bestScoreRecoil } from "./playing-data";
import { useRecoilState } from "recoil";
import { croppingModeOnPlacementRecoil } from "./cropping-mode-on-placement-recoil";
import { actOnLevelState } from "../../level-model";
import { levelRecoil } from "./level-recoil";
import { figureRotationsRecoil } from "./figure-rotations-recoil";
import update from "immutability-helper";



export const usePutPointerFigure = () => {
    const [level, setLevel] = useRecoilState(levelRecoil);
    const [bestScore, setBestScore] = useRecoilState(bestScoreRecoil);
    const [isCroppingActive, setIsCroppingActive] = useRecoilState(croppingModeOnPlacementRecoil);
    const [figureRotations, setFigureRotations] = useRecoilState(figureRotationsRecoil);

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
            figureRotation: figureRotations[pointerFigureIndex],
            isCroppingActive,
        } as Parameters<typeof actOnLevelState>[1];
        const actionResult = actOnLevelState(level.state, action);
        if (!actionResult[0]) {
            console.error(actionResult[1]);
            return;
        }
        const [, state, transition] = actionResult;

        setFigureRotations(update(figureRotations, {
            [pointerFigureIndex]: { $set: 0 },
        }));

        setLevel({
            prev: level,
            state,
            transition,
            action,
        });

        setIsCroppingActive(false);
        setBestScore(Math.max(bestScore, state.score));

    };
};
