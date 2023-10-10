import { useRecoilValue } from "recoil";
import { gameDecorationsRecoil } from "../settings/game-decorations-recoil";
import { jsx } from "@emotion/react";
import { useGLTF } from "@react-three/drei";
import candleGlb from "../../assetsx/candle-3d.glb";
import hatGlb from "../../assetsx/witch-hat.glb";
import pumpkinGlb from "../../assetsx/pumpkinGlb.glb";
import { GltfScene } from "../../utils/gltf-scene";

useGLTF.preload(candleGlb);
useGLTF.preload(pumpkinGlb);
useGLTF.preload(hatGlb);

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

    return <group {...props} >
        <GltfScene
            visible={value === 1}
            url={candleGlb}
            scale={[1.8, 1.8, 1.8]}
            position={[-0.3, 0, 0.3]}
        />
        <GltfScene
            visible={value === 2}
            url={pumpkinGlb}
            position={[0.12, 0, 0]}
        />
        <GltfScene
            visible={value === 3}
            url={hatGlb}
        />
    </group>;
};
