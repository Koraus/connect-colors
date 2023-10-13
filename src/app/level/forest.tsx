import { MeshStandardMaterial, SphereGeometry } from "three";
import { useMemo } from "react";
import tree2 from "../../assetsx/tree2.glb";
import { GltfScene } from "../../utils/gltf-scene";
import { useGLTF } from "@react-three/drei";

useGLTF.preload(tree2);

const PHI = (1 + Math.sqrt(5)) / 2;

export function Forest({
    ...props
}: JSX.IntrinsicElements["group"]) {
    const trees = useMemo(() => {
        const trees = [] as {
            x: number,
            y: number,
            h: number,
            s: number,
            a: number,
            r: number,
        }[];
        const count = 300;
        for (let i = 0; i < count; i++) {
            const r = ((i / count) ** 1.4) * 20 + 8 + Math.random() * 1.5;
            const a = i * PHI * Math.PI * 2 + Math.random() * 0.1;

            trees.push({
                x: Math.cos(a) * r,
                y: Math.sin(a) * r,
                s: (Math.random() ** 3) * 0.4 + 0.05 + r / 20,
                h: (Math.random() ** 4) * 1.5 + 0.5,
                a: Math.random() * Math.PI * 2,
                r,
            });
        }
        return trees;
    }, []);
    const m = useMemo(() => new MeshStandardMaterial({
        color: "#e4b666",
        roughness: 1,
        metalness: 0,
        flatShading: true,
    }), []);
    const g = useMemo(() => new SphereGeometry(2, 6, 4), []);

    return <group {...props}>{trees.map(({ x, y, h, s, a, r }, i) => <group
        key={i}
        position={[x, 0, y]}
        rotation={[0, a, 0]}
        scale={[s, s * h, s]}
    >
        <mesh
            scale={[0.5 + r / 30, 0.05, 0.5 + r / 30]}
        >
            <primitive object={g} attach="geometry" />
            <primitive object={m} attach="material" />
        </mesh>
        <GltfScene url={tree2} />
    </group>)
    }</group >;
}
