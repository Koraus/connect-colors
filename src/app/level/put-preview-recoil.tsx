import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./pointer-data";
import { selector } from "recoil";
import { croppingModeOnPlacementRecoil } from "./cropping-mode-on-placement-recoil";
import { actOnLevelState } from "../../level-model";
import { levelRecoil } from "./level-recoil";
import { figureRotationsRecoil } from "./figure-rotations-recoil";
import { tuple } from "../../utils/tuple";
import { refKey } from "../../utils/ref-key";
import { actPutFigure } from "../../level-model/act-put-figure";


export const putPreviewRecoil = selector({
    key: "putPreview",
    get: ({ get }) => {
        const level = get(levelRecoil);
        const figureRotations = get(figureRotationsRecoil);
        const isCroppingActive = get(croppingModeOnPlacementRecoil);
        const pointerFigureIndex = get(figureOnPointerIndexRecoil);
        if (pointerFigureIndex === undefined) {
            return {
                action: undefined,
                actionResult: tuple(false as const, {
                    reason: "no figure on pointer" as const,
                }),
            };
        }
        const coords = get(figureGhostCoordsRecoil);
        if (coords === undefined) {
            return {
                action: undefined,
                actionResult: tuple(false as const, {
                    reason: "no coords" as const,
                }),
            };
        }
        const isOverlayActive = true;
        const action = {
            action: "putFigure",
            coords,
            figureIndex: pointerFigureIndex,
            figureRotation: figureRotations[refKey(level.state.figures[pointerFigureIndex])] ?? 0,
            isCroppingActive,
            isOverlayActive,
        } as Parameters<typeof actPutFigure>[1] & { action: "putFigure" };
        const actionResult = actOnLevelState(level.state, action);
        return {
            action,
            actionResult,
        };
    },
});
