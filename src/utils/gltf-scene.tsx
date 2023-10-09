import { jsx } from "@emotion/react";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";


export const GltfScene = ({
    url, ...props
}: jsx.JSX.IntrinsicElements["group"] & {
    url: string;
}) => {
    const { scene } = useGLTF(url);
    const clone = useMemo(() => scene.clone(), [scene]);
    return <primitive object={clone} {...props} />;
};
