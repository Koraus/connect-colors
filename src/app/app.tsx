import { Canvas } from "@react-three/fiber";
import { PlayingField as _PlayingField } from "./level/playing-field.tsx";
import { GameFiguresArea as _GameFiguresArea } from "./level/game-figures-area.tsx";
import { Sound } from "./level/sound.tsx";
import audioUrl from "../assetsx/put-figure.wav";
import { OverlayGui as _OverlayGui } from "./overlay-gui.tsx";
import { memo } from "react";

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
                camera={{ fov: 35, position: [10, 28, -10.5] }}
                gl={{ useLegacyLights: true }}
            >
                <Sound url={audioUrl} />
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <PlayingField />
                <GameFiguresArea />
            </Canvas>
        </div>
    );
}
