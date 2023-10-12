import { Canvas } from "@react-three/fiber";
import { PlayingField as _PlayingField } from "./level/playing-field";
import { GameFiguresArea as _GameFiguresArea } from "./level/game-figures-area";
import { Sound } from "./level/sound";
import audioUrl from "../assetsx/put-figure.wav";
import { OverlayGui as _OverlayGui } from "./overlay-gui";
import { memo } from "react";
import { Forest } from "./level/Forest";
import { MenuWindow as _MenuWindow } from "./menu-window";
import { useState } from "react";

const PlayingField = memo(_PlayingField);
const GameFiguresArea = memo(_GameFiguresArea);
const OverlayGui = memo(_OverlayGui);
const MenuWindow = memo(_MenuWindow);


export default function App() {
    const [isMenuOpen, setIsmenueOpen] = useState(false);
    return (
        <div css={{
            position: "fixed",
            inset: 0,
            fontFamily: "Arial, Helvetica, sans-serif",
            backgroundColor: "#def9c8",
        }}>

            <Canvas
                camera={{ fov: 35, position: [5, 20, -10] }}
                gl={{ useLegacyLights: true }}
            >
                <Forest position={[0, 0, 4]} />
                <Sound url={audioUrl} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 15, -5]} intensity={0.8} />
                <PlayingField />
                <GameFiguresArea />
            </Canvas>

            <div css={{
                position: "absolute",
                inset: 0,
                padding: "2em",
                pointerEvents: "none",
            }}>
                <MenuWindow isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
                <OverlayGui isMenuOpen={isMenuOpen} setIsmenueOpen={setIsmenueOpen} />
            </div>
        </div >
    );
}
