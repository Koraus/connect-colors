import { css, keyframes } from "@emotion/react";

export const WinScene = () => {

    const getRandomRGB = () => {
        const randomRange = (
            min: number, max: number
        ) => min + Math.floor(Math.random() * (max - min + 1));
        return `rgb(${randomRange(0, 255)},
         ${randomRange(0, 255)},
          ${randomRange(0, 255)})`;
    }

    const winAnimation = keyframes`
    0% {
		transform: scale(0.5);
        transform: translate(10vmax, -70vmax);
	}

	70% {
		transform: scale(1.5);
        transform: translate(15max, 50vmax);
	}

	100% {
		transform: scale(0.2);
        transform: translate(20vmax, 110max);
	}
`
const winAnimation2 = keyframes`
    0% {
        transform: scale(0.5);
        transform: translate(10vmax, 100vmax);
    }

    70% {
        transform: scale(1.5);
        transform: translate(15max, -50vmax);
    }

    100% {
        transform: scale(0.2);
        transform: translate(20vmax, -110max);
    }
`

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
            }}
        >

            {
                Array.from(
                    { length: 150 },
                    (_, i) => i).map((_, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    top: Math.random() * 100 + "%",
                                    left: Math.random() * 100 + "%",
                                    width: "0.6vmax",
                                    height: "1vmax",
                                    borderRadius: "20%",
                                    background: getRandomRGB(),
                                }}
                                css={css `
                                animation: ${winAnimation} 3s ease infinite;
                              `}
                            >
                            </div>
                        )
                    }
                    )
            }
            {
                Array.from(
                    { length: 150 },
                    (_, i) => i).map((_, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    top: Math.random() * 100 + "%",
                                    left: Math.random() * 100 + "%",
                                    width: "0.6vmax",
                                    height: "1vmax",
                                    borderRadius: "20%",
                                    background: getRandomRGB(),
                                }}
                                css={css `
                                animation: ${winAnimation2} 2s ease infinite;
                              `}
                            >
                            </div>
                        )
                    }
                    )
            }
        </div >
    )
}