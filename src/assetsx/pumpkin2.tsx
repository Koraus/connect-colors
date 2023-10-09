import { useGLTF } from "@react-three/drei";
import modelFilePath from "./pumpkin2.glb";

export function Pumpkin2() {
    const { nodes, materials } = useGLTF(modelFilePath);
    return (
        <group
            dispose={null}
            scale={[1.8, 1.8, 1.8]}>
            <group position={[0, 0.22, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere001.geometry}
                    material={materials.pumpkin}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere001_1.geometry}
                    material={materials["pumpkin rib"]}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder.geometry}
                material={materials.stem}
                position={[0, 0.365, 0]}
                scale={[2.632, 1.343, 2.632]}
            />
        </group>
    );
}

useGLTF.preload(modelFilePath);