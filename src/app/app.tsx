import { Canvas } from '@react-three/fiber';
import { PlayingField } from './playing-field';
import { GameFiguresArea } from './game-figures-area';
import { RotateButtons } from './rotate-buttons';
import { CurrentScore } from './current-score'
import { CancelMoveBtn } from './cancel-move-btn';
import { BestScore } from './best-score';
import { MenuWindow } from './menu-window';
import { useEffect, useState } from 'react';
import { MenuBtn } from './menu-btn';
import { Sound } from './sound';
import audioUrl from "./assets/audio/put-figure.wav";
import { useRecoilState } from 'recoil';
import { figureOnPointerIndexRecoil, gameFiguresRecoil } from './playing-data';
import { rotateFigure } from '../model/rotate-figure';


function App() {

  const [isMenuOpen, setIsmenueOpen] = useState(false);

  const [pointerFigure, setPointerFigure] = useRecoilState(figureOnPointerIndexRecoil);
  const [gameFigures, setGameFigures] = useRecoilState(gameFiguresRecoil);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && pointerFigure !== undefined) {
        setPointerFigure(undefined);
      }
      if (event.key === 'r' && pointerFigure !== undefined) {
        setGameFigures(gameFigures.map((el, i) => {
          return i === pointerFigure ? rotateFigure(el) : el
        }
        ))
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [pointerFigure, gameFigures, setPointerFigure, setGameFigures]);

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
      </Canvas >
    </div>
  )
}

export default App