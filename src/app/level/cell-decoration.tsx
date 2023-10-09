import { useRecoilValue } from "recoil";
import { gameDecorationsRecoil } from "./playing-data";
// import { Tree } from "../../assetsx/tree";
import { Pumpkin } from "../../assetsx/pumpkin";
// import { Bucket } from "../../assetsx/bucket";
import { Candle } from "../../assetsx/candle";
import { jsx } from "@emotion/react";
import { ForwardedRef, forwardRef } from "react";
import { Group } from "three";
import { Hat } from "../../assetsx/witch-hat";
import { Pumpkin2 } from "../../assetsx/pumpkin2";


const cellColors = ["#fff1e4", "#6AA6FF", "#fa7fe9", "#4ee63a"];
const lightColors = ["#b7b7b7", "#80b4fd", "#ff8ff0", "#95f988"];

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

    return <group {...props} ref={ref} >{(() => {
        if (theme === "figures") {
            return [
                null, Candle, Pumpkin2, Hat,
                // Bucket, Tree, Pumpkin
            ][value]?.({ isGhost }) ?? <group />;
        }
    })()}</group>;
});
