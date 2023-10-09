import { useMemo } from "react";
import { jsx } from "@emotion/react";
import { levelRecoil } from "./level-recoil";
import { useRecoilValue } from "recoil";
import { isAvailablePut } from "../../level-model/is-available-move"
import { AnimatedCell } from "./animated-cell";
import { putPreviewRecoil } from "./put-preview-recoil";
import { Box } from "@react-three/drei";



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
    const putPreview = useRecoilValue(putPreviewRecoil);
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

    const isOvered = useMemo(() => {
        if (putPreview.action === undefined) { return; }
        const firure = level.state.figures[putPreview.action.figureIndex];
        const [i1, j1] = putPreview.action.coords;
        for (let i2 = 0; i2 < firure.length; i2++) {
            for (let j2 = 0; j2 < firure[i2].length; j2++) {
                if (firure[i2][j2] === 0) { continue; }
                if (i1 + i2 !== i) { continue; }
                if (j1 + j2 !== j) { continue; }

                const r = putPreview.actionResult;
                if (!r) { return "invalid"; }
                if (r[0]) { return "valid"; }
                if (
                    r[1]
                    && ("conflicts" in r[1])
                    && r[1].conflicts.find(([cx, cj]) => cx === i && cj === j)
                ) {
                    return "invalid";
                }
                return "valid";
            }
        }
        return;
    }, [putPreview, level, i, j]);
    const overedColor = isOvered === "valid" ? "#7d7fff" : "#fc4235";

    // todo: win/lose
    const isWin = useMemo(() => level.state.figureStockLeft === 0, [level]);
    const isLose = useMemo(() => !isAvailablePut(level.state), [level]);

    return <group position={[i, 0, j]} {...props}>
        {isOvered && <>
            <Box args={[0.05, 0.05, 1]} position={[0.5, 0, 0]}>
                <meshBasicMaterial color={overedColor} />
            </Box>
            <Box args={[1, 0.05, 0.05]} position={[0, 0, 0.5]}>
                <meshBasicMaterial color={overedColor} />
            </Box>  
            <Box args={[0.05, 0.05, 1]} position={[-0.5, 0, 0]}>
                <meshBasicMaterial color={overedColor} />
            </Box>
            <Box args={[1, 0.05, 0.05]} position={[0, 0, -0.5]}>
                <meshBasicMaterial color={overedColor} />
            </Box>
        </>}
        <AnimatedCell
            value={transition.value}
            mainTrack={transition}
            isGhost={false}
        />
    </group>;
};
