import { useRecoilValue } from "recoil";
import { gameDecorationsRecoil } from "../settings/game-decorations-recoil";
import { Candle } from "../../assetsx/candle";
import { jsx } from "@emotion/react";
import { Hat } from "../../assetsx/witch-hat";
import { Pumpkin2 } from "../../assetsx/pumpkin2";



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
                null, Candle, Pumpkin2, Hat,
                // Bucket, Tree, Pumpkin
            ][value]?.({ isGhost }) ?? <group />;
        }
    })()}</group>;
};
