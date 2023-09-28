import { useGLTF } from "@react-three/drei";


export function Bucket({ isGhost, ...props }: { isGhost?: boolean } & JSX.IntrinsicElements['group']) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { nodes, materials } = useGLTF("src/assets/3d/bucket-3d.glb");

    const waterColor = isGhost ? "#acc2e3" : "#4988e6";
    const woodColor = isGhost ? "#aa9d87" : "rgb(111, 102, 71)";
    const woodColor1 = isGhost ? "#bba478" : "#735f3b";

    return (
        <group
            {...props}
            dispose={null}
            scale={[0.12, 0.12, 0.12]}
            rotation={[Math.PI / 2, 0, 0]}
        >
            <group position={[-0.343, 0.999, 0.508]}>
                <mesh
                    // castShadow
                    // receiveShadow
                    geometry={nodes.bucket.geometry}
                // material={materials.wood}
                >
                    <meshBasicMaterial
                        attach="material"
                        color={woodColor1}
                    />
                </mesh>
                <mesh
                    // castShadow
                    // receiveShadow
                    geometry={nodes.bucket_1.geometry}
                // material={materials.wood}
                >
                    <meshBasicMaterial
                        attach="material"
                        color={woodColor}
                    />
                </mesh>
            </group>
            <mesh
                // castShadow
                // receiveShadow
                geometry={nodes.Cylinder002.geometry}
                // material={materials["Material.001"]}
                position={[-0.343, 1.956, 0.508]}
                scale={[0.723, 0.063, 0.733]}
            >
                <meshBasicMaterial
                    attach="material"
                    color={waterColor}
                />
            </mesh>
            <group
                position={[-0.153, 2.368, 0.508]}
                rotation={[0, 0, -0.583]}
                scale={[0.059, 0.38, 1]}
            >
                <mesh
                    // castShadow
                    // receiveShadow
                    geometry={nodes.Cube004.geometry}
                // material={materials["wood 2"]}
                >
                    <meshBasicMaterial
                        attach="material"
                        color={woodColor}
                    />
                </mesh>
                <mesh
                    // castShadow
                    // receiveShadow
                    geometry={nodes.Cube004_1.geometry}
                // material={materials["wood 2"]}
                >
                    <meshBasicMaterial
                        attach="material"
                        color={woodColor}
                    />
                </mesh>
            </group>
        </group >
    );
}

useGLTF.preload("/bucket-3d.glb");