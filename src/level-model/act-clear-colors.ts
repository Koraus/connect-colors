import { LevelState, CellColor, LevelTransition } from ".";
import { tuple } from "../utils/tuple";


export const actClearColors = (state: LevelState, action: {
    value: CellColor;
}) => {
    return tuple(false as const);
};
