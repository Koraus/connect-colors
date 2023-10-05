import { useRecoilState } from "recoil";
import { fieldWithoutCellsOfTheSameType } from "./field-without-cells-of-the-same-type";
import { playingFieldRecoil } from "./playing-data";

export const DestroySameColorCellsBooster = ({ type }: { type: number }) => {
    const [field, setfieldField] = useRecoilState(playingFieldRecoil);
    return (
        <button
            onClick={() => setfieldField({
                    ...field,
                    field: fieldWithoutCellsOfTheSameType(field.field, type)
                })}
        >
            Destroy Same Color Cells Booster {type}
        </button>
        // todo add score 
    )
} 