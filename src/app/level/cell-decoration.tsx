import { useRecoilValue } from "recoil";
import { gameDecorationsRecoil } from "./playing-data";
import { Tree } from "../../assetsx/tree";
import { Pumpkin } from "../../assetsx/pumpkin";
import { Bucket } from "../../assetsx/bucket";
import { jsx } from "@emotion/react";
import { ForwardedRef, forwardRef } from "react";
import { Group } from "three";


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
                null, Tree, Pumpkin, Bucket,
            ][value]?.({ isGhost }) ?? <group />;
        }
    })()}</group>;
});
