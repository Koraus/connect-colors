import { Group } from "three";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./playing-data";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CellDecoration } from "./cell-decoration";
import { jsx } from "@emotion/react";
import { usePutPointerFigure } from "./use-put-pointer-figure";


export const FieldCell = ({
    gameOver,
    coords,
    value,
    ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    gameOver: boolean,
    position: [number, number, number];
    coords: [number, number],
    value: number,
}) => {
    const cellRef = useRef<Group>(null);

    const [time, setTime] = useState<number>();
    useEffect(() => {
        if (value === 0) {
            setTime(Date.now());
        }
    }, [value]);

    // todo: make animation of CellDecoration
    useFrame(() => {
        if (time === undefined) { return; }
        const t = Date.now() - time;
        const y = Math.max(0, 1 - t / 500);
        cellRef.current?.scale.set(y, y, y);
        cellRef.current?.rotation.set(y * 0.4, y * 0.4, y * 0.4);

        if (y === 0) {
            cellRef.current?.scale.set(1, 1, 1);
        }
    });

    return <CellDecoration
        value={value}
        gameOver={gameOver}
        ref={cellRef}
        {...props}
    />;
};