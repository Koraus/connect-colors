import { RoundedBox } from '@react-three/drei';
import { cellColors, gameDecorationsRecoil } from './playing-data';
import { useRecoilValue } from 'recoil';
import { Tree } from './tree';
import { Pumpkin } from './pumpkin';
import { Bucket } from './bucket';


export const Cell = ({
  position, size, value, isGhost
}: {
  position: [number, number, number]; size: number[], value: number, isGhost?: boolean
}) => {
  const lightСolors = ['#b7b7b7', '#80b4fd', '#ff8ff0', '#95f988'];
  const color = isGhost ? lightСolors[value] : cellColors[value];
  const decorations = useRecoilValue(gameDecorationsRecoil)

  return (
    <group position={position}>
      {decorations === "simple"
        && <mesh  >
          <RoundedBox args={[size[0], size[1], size[2]]} >
            <meshLambertMaterial attach="material" color={color} />
          </RoundedBox>
        </mesh>}
      {
        decorations === "figures" && value === 1 &&
        <Tree isGhost={isGhost} />
      }
      {
        decorations === "figures" && value === 2 &&
        <Pumpkin isGhost={isGhost} />
      }
      {
        decorations === "figures" && value === 3 &&
        <Bucket isGhost={isGhost} />
      }
    </group>
  );
};
