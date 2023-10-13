import { useRecoilValue } from "recoil";
import { FieldCell } from "./field-cell";
import { levelInitRecoil } from "./level-recoil";

export const PlayingField = () => {
    const { fieldMap } = useRecoilValue(levelInitRecoil);

    return <>{
        fieldMap.map((row, i) =>
            row.map((_, j) =>
                <FieldCell key={`${i}_${j}`} coords={[i, j]} />))
    }</>;
};
