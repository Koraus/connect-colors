import { Canvas } from "@react-three/fiber";
import { PlayingField } from "./level/playing-field.tsx";
import { GameFiguresArea } from "./level/game-figures-area.tsx";
import { Sound } from "./level/sound.tsx";
import audioUrl from "../assetsx/put-figure.wav";
import { OverlayGui } from "./overlay-gui.tsx";


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
