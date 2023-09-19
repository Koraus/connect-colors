import { Color, Vector3 } from 'three';
import { RoundedBox } from '@react-three/drei';


export const Cell = ({
  value, position, size, coords
}: {
  value: number; position: Vector3; size: number[], coords?: [number, number]
}) => {
  const color = new Color(
    value === 0 ? '#b7b7b7'
      : value === 1 ? '#e8b364'
        : value === 2 ? '#fa7fe9'
          : value === 3 ? '#4ee63a' : '#bae4e4'
  );
  return (
    <mesh position={position} onPointerUp={() => console.log(coords)}>
      <RoundedBox args={[size[0], size[1], size[2]]}>
        <meshLambertMaterial attach="material" color={color} />
      </RoundedBox>
    </mesh>
  );
};
