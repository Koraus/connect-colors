import { Group } from 'three';
import { RoundedBox } from '@react-three/drei';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cellColors, figureGhostCoordsRecoil, figureOnPointerIndexRecoil, gameDecorationsRecoil } from './data-recoil/playing-data';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Tree } from './tree';
import { Pumpkin } from './pumpkin';
import { Bucket } from './bucket';


export const FieldCell = ({
  position,
  size,
  coords,
  value,
  putPointerFigure
}: {
  position: [number, number, number];
  size: number[],
  coords: [number, number],
  value: number,
  putPointerFigure: (coords: [number, number] | undefined) => void
}) => {

  const pointerFigureIndex = useRecoilValue(figureOnPointerIndexRecoil);
  const setFigureCoords = useSetRecoilState(figureGhostCoordsRecoil);
  const decorations = useRecoilValue(gameDecorationsRecoil)

  const cellRef = useRef<Group>(null!);

  const [time, setTime] = useState<number>();
  useEffect(() => {
    if (value === 0) {
      setTime(Date.now())
    }
  }, [value])

  useFrame(() => {
    if (time === undefined) return
    const t = Date.now() - time;
    const y = Math.max(0, 1 - t / 500)
    cellRef.current?.scale.set(y, y, y)
    cellRef.current?.rotation.set(y * 0.4, y * 0.4, y * 0.4)

    if (y === 0) {
      cellRef.current?.scale.set(1, 1, 1)
    }
  },)

  return (
    <group ref={cellRef}
      position={position}
      onPointerUp={() => { putPointerFigure(coords); }}
      onPointerOver={() => setFigureCoords(
        pointerFigureIndex !== undefined
          ? [
            position[0],
            position[1],
            position[2],
          ]
          : [0, 0, 0])
      }>
      {value === 0
        && <mesh>
          <RoundedBox args={[size[0], size[1], size[2]]}>
            <meshLambertMaterial attach="material" color={cellColors[value]} />
          </RoundedBox>
        </mesh >}
      {value !== 0 && decorations === "simple"
        && <mesh>
          <RoundedBox args={[size[0], size[1], size[2]]}>
            <meshLambertMaterial attach="material" color={cellColors[value]} />
          </RoundedBox>
        </mesh >}
      {decorations === "figures" && value === 1
        && <Tree isGhost={false} />}
      {decorations === "figures" && value === 2
        && <Pumpkin isGhost={false} />}
      {decorations === "figures" && value === 3
        && <Bucket isGhost={false} />}
    </group >
  );
};