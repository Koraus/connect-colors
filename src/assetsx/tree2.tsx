import { jsx } from "@emotion/react";
import { useGLTF } from "@react-three/drei";
import tree from "./tree2.glb";
import { useMemo } from "react";

useGLTF.preload(tree);

export const Tree2 = ({
    ...props
}: jsx.JSX.IntrinsicElements["group"]) => {
    const { scene } = useGLTF(tree);
    const clone = useMemo(() => scene.clone(), [scene]);
    return <primitive object={clone} {...props} />;
};
