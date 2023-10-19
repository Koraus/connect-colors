import { useRecoilState } from "recoil";
import { levelRecoil } from "./level-recoil";
import undoIcon from "../../assets/undo-move.svg"

export const UndoBtn = () => {

    const [level, setLevel] = useRecoilState(levelRecoil);

    return (
        <button
            style={{
                fontSize: "1rem",
                boxSizing: "border-box",
                borderRadius: "1.5vmax",
                border: "0.3vmax solid #E4E4E4",
                background: "linear-gradient(180deg, #2587E2 0%, #1A4C69 100%)",
                padding: "0.5vmax",
                width: "fit-content",
                position: "fixed",
                left: "2vmax",
                bottom: "2vmax",
                filter: !("prev" in level) ? "grayscale(80%)" : "none",
            }}
            disabled={!("prev" in level)}
            onClick={() => {
                if (!("prev" in level)) { return; }
                setLevel(level.prev);
            }} >
            <div style={{
                boxSizing: "border-box",
                background: "linear-gradient(90deg, #49B5F7 0%, #2578CF 100%)",
                borderRadius: "1vmax",
                padding: "0.4vmax",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }} >
                <img
                    draggable={false}
                    src={undoIcon}
                    alt="icon"
                    style={{
                        display: "block",
                        width: "4.5vmax",

                    }}
                />
            </div>
        </button>
    );
};
