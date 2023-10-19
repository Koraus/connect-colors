import randomIcon from "../assets/random-level.svg"

export const NextLvl = () => {

    return (
        <button
            style={{
                transform:" scale(1.7)",
                fontSize: "1rem",
                boxSizing: "border-box",
                borderRadius: "1.5vmax",
                border: "0.3vmax solid #E4E4E4",
                background: "linear-gradient(180deg, #2587E2 0%, #1A4C69 100%)",
                padding: "0.5vmax",
                width: "fit-content",
                height: "fit-content",
                position: "fixed",
                top: "calc(50% - 4.5vmax - 0.3vmax - 0.5vmax)",
                left: "calc(50% - 4.5vmax - 0.3vmax - 0.5vmax)",

            }}
            onClick={() => location.reload()}

        >
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
                    src={randomIcon}
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
