import { useRecoilState } from "recoil";
import { Undo } from "@emotion-icons/boxicons-regular/Undo";
import { levelRecoil } from "./level-recoil";

export const UndoBtn = () => {

    const [level, setLevel] = useRecoilState(levelRecoil);

    return (
        <button
            style={{
                fontSize: "14px",
                marginBottom: "0.3rem",
                display: "flex",
                alignItems: "center",
                borderRadius: "0.3rem",
            }}
            disabled={!("prev" in level)}
            onClick={() => {
                if (!("prev" in level)) { return; }
                setLevel(level.prev);
            }}
        > Undo
            <span style={{ display: "inline-block", height: "1.5em" }} >
                <Undo height={"100%"} />
            </span>

        </button >
    );
};
