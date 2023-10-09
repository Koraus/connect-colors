import { useGLTF } from "@react-three/drei";
import modelFilePath from "./witch-hat.glb";

export function Hat() {
    const { nodes, materials } = useGLTF(modelFilePath);
    return (
        <group dispose={null} position={[0.07, -0, -0.17]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder.geometry}
                material={materials.cloth}
                position={[-0.036, 0.125, 0.16]}
                rotation={[3.127, 0.998, -3.119]}
                scale={0.646}
            />
            <group
                position={[0.124, 0.177, 0.084]}
                rotation={[3.127, 0.998, -3.119]}
                scale={[0.646, 0.646, 1.55]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube001.geometry}
                    material={materials.gold}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube001_1.geometry}
                    material={materials.gold}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001.geometry}
                material={materials.cloth}
                position={[-0.037, 0.184, 0.165]}
                rotation={[3.127, 0.998, -3.119]}
                scale={0.646}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder002.geometry}
                material={materials.lether}
                position={[-0.037, 0.174, 0.165]}
                rotation={[3.127, 0.998, -3.119]}
                scale={0.602}
            />
        </group>
    );
}

useGLTF.preload(modelFilePath);
