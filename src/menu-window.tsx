import { Dispatch, SetStateAction } from "react";
import { PlayFill } from "@emotion-icons/bootstrap/PlayFill";

export const MenuWindow = ({
    isOpen, setIsOpen
}: {
    isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        isOpen && <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                zIndex: 100,
                inset: 0
            }}
        >
            <div
                style={{
                    width: "70vw",
                    height: "90vh",
                    padding: "1rem",
                    backgroundColor: "rgba(67, 199, 255,0.95)",
                    borderRadius: "0.3rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <h1 style={{ textAlign: "center" }}>Menu</h1>

                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        fontSize: "14px",
                        borderRadius: "0.3em",
                        padding: "2em 2em",
                    }}
                >
                    <span style={{
                        display: "inline-block", height: "1.5em",
                    }} > Return to the game <PlayFill size={"100%"} />
                    </span>

                </button >
            </div>

        </div >
    )
}
