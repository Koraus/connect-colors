import { useRecoilState } from "recoil";
import { playingFieldRecoil } from "./playing-data";
import { Undo } from "@emotion-icons/boxicons-regular/Undo"

export const CancelMoveBtn = () => {

    const [field, setField] = useRecoilState(playingFieldRecoil);

    return (
        <button
            style={{
                fontSize: "14px",
                marginBottom: "0.3rem",
                display: "flex",
                alignItems: "center",
                borderRadius: "0.3rem",
            }}
            disabled={field.prevMove === undefined}
            onClick={() => {
                if (field.prevMove === undefined) return
                setField({
                    field: field.prevMove.field,
                    score: field.prevMove.score,
                    prevMove: undefined
                })
            }}
        > Undo
            <span style={{ display: "inline-block", height: "1.5em" }} >
                <Undo height={"100%"} />
            </span>

        </button >
    )
}
