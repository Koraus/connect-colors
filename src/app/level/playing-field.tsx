import { useRecoilValue } from "recoil";
import { FieldCell } from "./field-cell";
import { levelInitRecoil } from "./level-recoil";

export const PlayingField = () => {
    const li = useRecoilValue(levelInitRecoil);
    const m = li.fieldMap.length;
    const n = li.fieldMap[0].length;

    return <>
        {Array.from({ length: n }, (_, i) =>
            Array.from({ length: m }, (_, j) =>
                <FieldCell key={i * m + j} coords={[i, j]} />))}
    </>;
};
