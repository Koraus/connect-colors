import { RoundedBox } from '@react-three/drei';
import { cellColors } from './data-recoil/playing-data';


export const Cell = ({
  position, size, value,
}: {
  position: [number, number, number]; size: number[], value: number
}) => {

  return (
    <mesh position={position}>
      <RoundedBox args={[size[0], size[1], size[2]]}>
        <meshLambertMaterial attach="material" color={cellColors[value]} />
      </RoundedBox>
    </mesh>
  );
};
