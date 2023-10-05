import { Canvas } from "@react-three/fiber";
import { PlayingField } from "./playing-field";
import { GameFiguresArea } from "./game-figures-area";
import { RotateButtons } from "./rotate-buttons";
import { CurrentScore } from "./current-score";
import { CancelMoveBtn } from "./cancel-move-btn";
import { BestScore } from "./best-score";
import { MenuWindow } from "./menu-window";
import { useState } from "react";
import { MenuBtn } from "./menu-btn";
import { Sound } from "./sound";
import audioUrl from "../assetsx/put-figure.wav";
import { useRecoilState, useRecoilValue } from "recoil";
import { figureOnPointerIndexRecoil, gameFiguresRecoil, levelsRecoil } from "./playing-data";
import { rotateFigure } from "../model/rotate-figure";
import { useWindowEvent } from "../utils/use-window-event";
import { DestroySameTypeCellsBooster } from "./destroy-same-color-cells-booster";
import { CroppingModeOnPlacementBooster } from "./cropping-mode-on-placement-booster.tsx";


function App() {

  const lvl = useRecoilValue(levelsRecoil)[0];
  const [isMenuOpen, setIsmenueOpen] = useState(false);

  const [pointerFigure, setPointerFigure] = useRecoilState(figureOnPointerIndexRecoil);
  useWindowEvent("keydown", (event: KeyboardEvent) => {
    if (event.code !== "Escape") { return; }
    if (pointerFigure === undefined) { return; }

    setPointerFigure(undefined);
  }, [pointerFigure, setPointerFigure]);

  const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);
  useWindowEvent("keydown", (event: KeyboardEvent) => {
    if (event.code !== "KeyR") { return; }
    if (pointerFigure === undefined) { return; }

    setGameFigures(gameFigures.map((el, i) =>
      i === pointerFigure
        ? rotateFigure(el)
        : el));
  }, [gameFigures, setGameFigures]);

  return (
    <div css={{
      position: "fixed",
      inset: 0,
      fontFamily: "Arial, Helvetica, sans-serif",
      backgroundColor: "#f7e4d7",
      padding: "2rem",
    }}>
      <MenuWindow isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
      <div css={{
        position: "fixed",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        maxWidth: "30vw",
        pointerEvents: pointerFigure === undefined ? "auto" : "none",
      }}>
        <div css={{ marginRight: "1em" }}>
          <MenuBtn isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
          <RotateButtons />
          <CancelMoveBtn />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <DestroySameTypeCellsBooster type={1} />
          <DestroySameTypeCellsBooster type={2} />
          <DestroySameTypeCellsBooster type={3} />
          <CroppingModeOnPlacementBooster />
        </div>
        <div>
          <CurrentScore />
          <BestScore />
        </div>
        <div style={{
          fontSize: "2rem",
        }}> level&nbsp;{lvl.level}&nbsp;{lvl.isCompleted ? "completed" : ""}
        </div>
        {lvl.isCompleted
          && <button
            style={{
              position: "fixed",
              inset: "50%",
              width: "10vw",
              height: "10vh",
              zIndex: 2
            }}
            onClick={() => location.reload()}> next lvl
          </button>
        }
        <div style={{
          rotate: "336deg",
          transform: "translate(35vh, 37vh)",
          fontSize: "2rem",
          height: "fit-content",
        }}> You need to place {lvl.stock} figures. {lvl.stockCounter}  left to place
        </div>
      </div>

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

export default App;