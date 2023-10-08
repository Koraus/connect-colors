import { useRecoilValue } from "recoil";
import { gameDecorationsRecoil } from "./playing-data";
import { Tree } from "../../assetsx/tree";
import { Pumpkin } from "../../assetsx/pumpkin";
import { Bucket } from "../../assetsx/bucket";
import { jsx } from "@emotion/react";



export const CellDecoration = ({
    value,
    isGhost = false,
    ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    value: number,
    isGhost?: boolean,
}) => {
    // todo: make prop (or not)
    const theme = useRecoilValue(gameDecorationsRecoil);

    return <group {...props} >{(() => {
        if (theme === "figures") {
            return [
                null, Tree, Pumpkin, Bucket,
            ][value]?.({ isGhost }) ?? <group />;
        }
    })()}</group>;
};
