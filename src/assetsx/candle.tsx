import { useGLTF } from "@react-three/drei";
import candleFilePath from "./candle-3d.glb";

export function Candle() {
  const { nodes, materials } = useGLTF(candleFilePath);
  return (
    <group
      dispose={null}
      scale={[1.8, 1.8, 1.8]}
      position={[-0.22, 0, 0.3]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere001.geometry}
        material={materials.fire}
        position={[0.147, 0.376, -0.15]}
        rotation={[-0.096, 1.185, 0.074]}
        scale={0.139}
      />
      <group position={[0.15, 0.15, -0.15]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder008.geometry}
          material={materials.candle}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder008_1.geometry}
          material={materials["candle.002"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={nodes.Cylinder001.material}
        position={[0.149, 0.313, -0.148]}
      />
    </group>
  );
}

useGLTF.preload(candleFilePath);