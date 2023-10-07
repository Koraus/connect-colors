import { Group } from "three";
import { useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { CellDecoration } from "./cell-decoration";
import { jsx } from "@emotion/react";
import { levelRecoil } from "./level-recoil";
import { useRecoilValue } from "recoil";
import { isAvailableMove } from "../../level-model/is-available-move";
import { RoundedBox } from "@react-three/drei";


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
            return [currentValue];
        }
        const prevValue = level.prev.state.field[i][j];
        if (!("fieldWithFigure" in level.transition)) {
            return [prevValue, currentValue];
        }
        const transValue = level.transition.fieldWithFigure[i][j];
        return [prevValue, transValue, currentValue];
    }, [level, i, j]);
    const isWin = useMemo(() => level.state.figureStockLeft === 0, [level]);
    const isLose = useMemo(() => !isAvailableMove(level.state.figures, level.state.field), [level]);

    const animationStartMs = useMemo(() => Date.now(), [level]);
    useFrame(() => {
        const g = gRef.current;
        if (!g) { return; }
        const timeMs = Date.now() - animationStartMs;
        for (let k = 0; k < g.children.length - 1; k++) {
            const pObj = g.children[k];
            const nObj = g.children[k + 1];
            const transitionT = (timeMs / 300) - k;
            if (transitionT <= 0) {
                nObj.visible = false;
            } else if (transitionT > 1) {
                pObj.visible = false;
            } else {
                const pv = transition[k];
                const nv = transition[k + 1];
                if (pv === nv) {
                    // idle
                    pObj.visible = false;
                    nObj.visible = true;
                    pObj.position.y = 0;
                    nObj.scale.set(1, 1, 1);
                } else if (pv === 0) {
                    // appear
                    pObj.visible = false;
                    nObj.visible = true;
                    nObj.position.y = 0.5 * (1 - transitionT) ** 2;
                    nObj.scale.setScalar(1);
                } else {
                    // disappear
                    pObj.visible = true;
                    nObj.visible = false;
                    pObj.position.y = 0;
                    pObj.scale.setScalar(1 - transitionT);
                }
            }
        }
    });




    const gRef = useRef<Group>(null);
    return <group position={[i, 0, j]} {...props}>
        <RoundedBox args={[0.9, 0.1, 0.9]}>
            <meshLambertMaterial color={
                isWin ? "green" :
                    isLose
                        ? "red"
                        : cellColors[level.state.field[i][j]]
            } />
        </RoundedBox>
        <group ref={gRef}>
            {transition.map((el, k) => <CellDecoration key={k} value={el} />)}
        </group>
    </group>;
};
