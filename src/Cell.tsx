import { Color, Vector3 } from 'three';
import { RoundedBox } from '@react-three/drei';
import { color } from './data-recoil/playing-data';


export const Cell = ({
  value, position, size,
}: {
  value: number; position: Vector3; size: number[],
}) => {
  const cellColor = new Color(color[value]);
  return (
    <mesh position={position}>
      <RoundedBox args={[size[0], size[1], size[2]]}>
        <meshLambertMaterial attach="material" color={cellColor} />
      </RoundedBox>
    </mesh>
  );
};
