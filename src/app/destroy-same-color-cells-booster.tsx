import { useRecoilState } from "recoil";
import { fieldWithoutCellsOfTheSameType } from "../level-model/field-without-cells-of-the-same-type";
import { playingFieldRecoil } from "./playing-data";

export const DestroySameTypeCellsBooster = ({ type }: { type: number }) => {
    const [field, setfieldField] = useRecoilState(playingFieldRecoil);
    return (
        <button
            style={{ width: "fit-content", }}
            onClick={() => setfieldField({
                ...field,
                field: fieldWithoutCellsOfTheSameType(field.field, type)
            })}
        >
            Destroy All Type{type}
        </button>
        // todo add score 
    )
} 