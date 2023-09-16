import { useRecoilValue } from "recoil"
import { gameFigureRecoil } from "./data-recoil/playing-data"
import { Cell } from "./Cell"
import { Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const GameFigure = () => {

    const { viewport } = useThree()

    const ref = useRef(null)
    const [isPressed, setIsPressed] = useState(false)


    useEffect(() => {
        if (isPressed) {
            window.addEventListener('mouseup', () => setIsPressed(false))
        }
        return () => {
            window.removeEventListener('mouseup', () => setIsPressed(false))
        }
    }, [isPressed])

    useFrame(({ mouse }) => {
        if (!isPressed) { return }
        if (isPressed) {
            const x = (mouse.x * viewport.width) / 2 -  5;
            const y = (mouse.y * viewport.height) / 2 ;
            
            ref.current && ref.current.position.set(x, y, 0.2)
        }
    })

    const rowLength = 4;
    const gameFigure = useRecoilValue(gameFigureRecoil);
    const cellSize = [0.3, 0.3, 0.2];

    const sideShift = 4;
    const gape = 0.03;

    const cells = gameFigure.map((el, index) => {
        const row = Math.floor(index / rowLength);
        const column = index % rowLength;
        const position = new Vector3(
            ((cellSize[0] + gape) * column) + sideShift,
            (cellSize[1] + gape) * row,
            0
        );
        return el === 0 ? null : <Cell
            value={el}
            key={index}
            position={position}
            size={cellSize} />;
    }
    );
    return <group
        ref={ref}
        onPointerDown={() => setIsPressed(true)}
    >

        {cells}
    </group>

}