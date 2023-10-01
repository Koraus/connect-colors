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
import { useRecoilState } from "recoil";
import { figureOnPointerIndexRecoil, gameFiguresRecoil } from "./playing-data";
import { rotateFigure } from "../model/rotate-figure";
import { useWindowEvent } from "../utils/use-window-event";


function App() {

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
      <div css={{ position: "fixed", zIndex: 2, display: "flex" }}>
        <div css={{ marginRight: "3em" }}>
          <MenuBtn isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
          <RotateButtons />
          <CancelMoveBtn />
        </div>
        <div>
          <CurrentScore />
          <BestScore />
        </div>

      </div>
      <Canvas camera={{ fov: 45, position: [-2, -2.1, 5.6], up: [0, 0, 1] }}>
        <Sound url={audioUrl} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PlayingField />
        <GameFiguresArea />
      </Canvas>
    </div>
  );
}

export default App;