import { RoundedBox } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import { gameDecorationsRecoil } from "./playing-data";
import { Tree } from "../assetsx/tree";
import { Pumpkin } from "../assetsx/pumpkin";
import { Bucket } from "../assetsx/bucket";
import { jsx } from "@emotion/react";
import { ForwardedRef, forwardRef } from "react";
import { Group } from "three";


const cellColors = ["#b7b7b7", "#6AA6FF", "#fa7fe9", "#4ee63a"];
const lightСolors = ["#b7b7b7", "#80b4fd", "#ff8ff0", "#95f988"];

export const CellDecoration = forwardRef(({
    value,
    gameOver = false,
    isGhost = false,
    ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    value: number;
    isGhost?: boolean;
    gameOver?: boolean;
}, ref: ForwardedRef<Group | null>) => {
    const theme = useRecoilValue(gameDecorationsRecoil); // todo: make prop
    const color = isGhost ? lightСolors[value] : cellColors[value];

    return <group {...props} ref={ref} >{(() => {
        if (value === 0) {
            return <RoundedBox args={[0.3, 0.3, 0.1]}>
                <meshLambertMaterial attach="material" color={gameOver ? "red" : color} />
            </RoundedBox>;
        }

        if (theme === "figures") {
            return [
                Tree, Pumpkin, Bucket,
            ][value - 1]({ isGhost });
        }

        return <RoundedBox args={[0.3, 0.3, 0.1]}>
            <meshLambertMaterial attach="material" color={color} />
        </RoundedBox>;
    })()}</group>;
});
