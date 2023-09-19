import { useRecoilValue, useSetRecoilState } from "recoil"
import { figureCoordsRecoil, gameFiguresRecoil, heldFigureRecoil } from "./data-recoil/playing-data"
import { Cell } from "./Cell"
import { Vector3 } from "three";


export const GameFigure = () => {

    const setPointerFigure = useSetRecoilState(heldFigureRecoil);

    const gameFigure = useRecoilValue(gameFiguresRecoil)[0];
    const cellSize = [0.3, 0.3, 0.2];
    const gape = 0.03;

    const cells = gameFigure.map((el, index1) => {

        return [el.map((el, index) => {
            const position = new Vector3(
                ((cellSize[0] + gape) * index),
                index1 * (cellSize[1] + gape),
                0
            );
            return (el === 0 ? null :
                <Cell
                    value={el}
                    key={index}
                    coords={[index1, index]}
                    position={position}
                    size={cellSize} />
            )
        })]
    });

    const position = useRecoilValue(figureCoordsRecoil);
    return <group
        position={position}
        onClick={() => { setPointerFigure(gameFigure); }}
    >
        {cells}
    </group >

}