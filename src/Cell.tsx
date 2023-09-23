import { RoundedBox } from '@react-three/drei';
import { cellColors } from './data-recoil/playing-data';


export const Cell = ({
  position, size, value, isGhost
}: {
  position: [number, number, number]; size: number[], value: number, isGhost?: boolean
}) => {
  const lightСolors = ['#b7b7b7', '#80b4fd', '#ff8ff0', '#95f988'];
  const color = isGhost ? lightСolors[value] : cellColors[value];
  return (
    <mesh position={position} >
      <RoundedBox args={[size[0], size[1], size[2]]} >
        <meshLambertMaterial attach="material" color={color} />
      </RoundedBox>
    </mesh>
  );
};
