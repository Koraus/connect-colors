import { useMemo } from "react";
import { CellDecoration } from "./cell-decoration";
import { jsx } from "@emotion/react";
import { levelRecoil } from "./level-recoil";
import { useRecoilValue } from "recoil";
import { isAvailableMove } from "../../level-model/is-available-move";
import { RoundedBox } from "@react-three/drei";
import { TransitionGroup } from "../../utils/transition-group";


const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);

const getTransition = (value: number, prevValue: number) => {
    if (value === prevValue) {
        return {
            transition: "idle" as const,
            durationMs: 300,
        };
    }
    if (value === 0) {
        return {
            transition: "disappear" as const,
            durationMs: 300,
        };
    }
    return {
        transition: "appear" as const,
        durationMs: 300,
    };
};


export const FieldCell = ({
    coords: [i, j],
    ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    coords: [number, number],
}) => {
    const cellColors = ["#fff1e4", "#7bf487", "#fdca9f", "#bdc5f9"];

    const level = useRecoilValue(levelRecoil);
    const transition = useMemo(() => {

        const currentValue = level.state.field[i][j];
        if (!("prev" in level)) {
            return {
                value: currentValue,
                track: [],
            };
        }
        const prevValue = level.prev.state.field[i][j];
        if (!("fieldWithFigure" in level.transition)) {
            return {
                value: currentValue,
                track: [getTransition(currentValue, prevValue)],
            };
        }
        const transValue = level.transition.fieldWithFigure[i][j];
        return {
            value: transValue,
            track: [
                getTransition(transValue, prevValue),
                getTransition(currentValue, transValue),
            ],
        };
    }, [level, i, j]);
    const isWin = useMemo(() => level.state.figureStockLeft === 0, [level]);
    const isLose = useMemo(() => !isAvailableMove(level.state.figures, level.state.field), [level]);

    const transitionStartMs = useMemo(() => Date.now(), [level]);
    return <group position={[i, 0, j]} {...props}>
        <RoundedBox args={[0.9, 0.1, 0.9]}>
            <meshLambertMaterial color={
                isWin ? "green" :
                    isLose
                        ? "red"
                        : cellColors[level.state.field[i][j]]
            } />
        </RoundedBox>
        <TransitionGroup
            startMs={transitionStartMs}
            track={transition.track}


            setTransitionState={(g, transition, timeMs) => {
                if (transition) {
                    const t = timeMs / transition.durationMs;
                    const ct = clamp(t, 0, 1);

                    switch (transition.transition) {
                        case "appear": {
                            g.position.y = 0.5 * (1 - ct) ** 2;
                            g.scale.setScalar(1);
                            return;
                        }
                        case "disappear": {
                            g.position.y = 0;
                            g.scale.setScalar(1 - ct);
                            return;
                        }
                        case "idle": {
                            g.position.y = 0;
                            g.scale.setScalar(1);
                            return;
                        }
                        case "empty": {
                            g.position.y = 0;
                            g.scale.setScalar(0);
                            return;
                        }
                    }
                }

                g.scale.setScalar(1);
                g.position.y = 0;
            }}

        >
            <CellDecoration
                value={transition.value}
                isGhost={false}
                gameOver={isWin || isLose}
            />
        </TransitionGroup>
    </group>;
};
