import { Canvas } from "@react-three/fiber";
import { PlayingField as _PlayingField } from "./level/playing-field.tsx";
import { GameFiguresArea as _GameFiguresArea } from "./level/game-figures-area.tsx";
import { Sound } from "./level/sound.tsx";
import audioUrl from "../assetsx/put-figure.wav";
import { OverlayGui as _OverlayGui } from "./overlay-gui.tsx";
import { memo } from "react";
import { Forest } from "../assetsx/forest.tsx";

const PlayingField = memo(_PlayingField);
const GameFiguresArea = memo(_GameFiguresArea);
const OverlayGui = memo(_OverlayGui);


export default function App() {
    return (
        <div css={{
            position: "fixed",
            inset: 0,
            fontFamily: "Arial, Helvetica, sans-serif",
            backgroundColor: "#f7e4d7",
            padding: "2rem",
        }}>
            <OverlayGui />

            <Canvas
                camera={{ fov: 35, position: [5, 20, -10] }}
                gl={{ useLegacyLights: true }}
            >
                {
                    Array.from(
                        { length: 10 },
                        () => Array.from(
                            { length: 11 },
                            () => 0))
                        .map(
                            (v, i) => {
                                return v.map(
                                    (val, j) => {
                                        if (i < 7 && i > 1 && j < 8 && j > 1) {
                                            return null;
                                        } else {
                                            const key = `${i}-${j}`;
                                            return <Forest
                                                key={key}
                                                position={[
                                                    (j * 2.4) - 11,
                                                    0,
                                                    (i * 2.4) - 5
                                                ]}
                                                scale={[0.8, 0.8, 0.8]}
                                                rotation={[0, (Math.PI / 2) * i, 0]}
                                            />
                                        }
                                    }
                                )
                            })
                }
                <Sound url={audioUrl} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 15, -5]} intensity={0.8} />
                <PlayingField />
                <GameFiguresArea />
            </Canvas>
        </div>
    );
}
