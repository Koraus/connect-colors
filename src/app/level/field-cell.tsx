import { useMemo } from "react";
import { jsx } from "@emotion/react";
import { levelRecoil } from "./level-recoil";
import { useRecoilValue } from "recoil";
import { isAvailableMove } from "../../level-model/is-available-move"
import { AnimatedCell } from "./animated-cell";



const getTransition = (value: number, prevValue: number) => {
    if (value === prevValue) { return "idle" as const; }
    if (value === 0) { return "disappear" as const; }
    return "appear" as const;
};


export const FieldCell = ({
    coords: [i, j],
    ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    coords: [number, number],
}) => {
    const level = useRecoilValue(levelRecoil);
    const transition = useMemo(() => {
        const startMs = Date.now();
        const currentValue = level.state.field[i][j];
        if (!("prev" in level)) {
            return {
                startMs,
                value: currentValue,
                track: [],
            };
        }
        const prevValue = level.prev.state.field[i][j];
        if (!("fieldWithFigure" in level.transition)) {
            return {
                startMs,
                value: currentValue,
                track: [getTransition(currentValue, prevValue)],
            };
        }
        const transValue = level.transition.fieldWithFigure[i][j];
        return {
            startMs,
            value: transValue,
            track: [
                getTransition(transValue, prevValue),
                getTransition(currentValue, transValue),
            ],
        };
    }, [level, i, j]);

    // todo: win/lose
    const isWin = useMemo(() => level.state.figureStockLeft === 0, [level]);
    const isLose = useMemo(() => !isAvailableMove(level.state.figures, level.state.field), [level]);

    return <group position={[i, 0, j]} {...props}>
        <AnimatedCell
            value={transition.value}
            mainTrack={transition}
            isGhost={false}
        />
    </group>;
};
