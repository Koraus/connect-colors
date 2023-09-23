import { Mesh } from 'three';
import { RoundedBox } from '@react-three/drei';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cellColors, figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from './data-recoil/playing-data';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';


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

  const cellRef = useRef<Mesh>(null!);

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
    <mesh
      ref={cellRef}
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
      }
    >
      <RoundedBox args={[size[0], size[1], size[2]]}>
        <meshLambertMaterial attach="material" color={cellColors[value]} />
      </RoundedBox>
    </mesh >
  );
};