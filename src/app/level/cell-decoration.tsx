import { useRecoilValue } from "recoil";
import { gameDecorationsRecoil } from "../settings/game-decorations-recoil";
import { jsx } from "@emotion/react";
import { useGLTF } from "@react-three/drei";
import candleGlb from "../../assetsx/candle-3d.glb";
import pumpkin2Glb from "../../assetsx/pumpkin2.glb";
import hatGlb from "../../assetsx/witch-hat.glb";
import { GltfScene } from "../../utils/gltf-scene";

useGLTF.preload(candleGlb);
useGLTF.preload(pumpkin2Glb);
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
            url={hatGlb}
            position={[0.07, -0, -0.17]}
        />
        <GltfScene
            visible={value === 3}
            url={pumpkin2Glb}
            scale={[1.8, 1.8, 1.8]}
        />
    </group>;
};
