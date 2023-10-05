import { LevelState, LevelTransition } from ".";


export const actPutFigure = (state: LevelState, action: {
    figureIndex: number;
    figureRotation: number;
    isCropActive: boolean;
}): [LevelTransition, LevelState] => {
    return [{}, state];
};
