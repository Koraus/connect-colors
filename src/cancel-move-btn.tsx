import { useRecoilState } from "recoil";
import { playingFieldRecoil } from "./data-recoil/playing-data";


export const CancelMoveBtn = () => {

    const [field, setField] = useRecoilState(playingFieldRecoil);

    return (
        <button
            disabled={field.prevMove === undefined}
            onClick={() => {
                if (field.prevMove === undefined) return
                setField({
                    field: field.prevMove.field,
                    score: field.prevMove.score,
                    prevMove: undefined
                })
            }}
        > Cancel Move </button >
    )
}
