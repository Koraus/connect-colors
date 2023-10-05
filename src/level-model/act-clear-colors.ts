import { LevelState, CellColor, LevelTransition } from ".";


export const actClearColors = (state: LevelState, action: {
    value: CellColor;
}): [LevelTransition, LevelState] => {
    return [{}, state];
};
