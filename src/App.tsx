import { Canvas } from '@react-three/fiber'
import './App.css'
import { PlayingField } from './playing-field';
import { ResetBtn } from './reset-btn';
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


function App() {


  const [isMenuOpen, setIsmenueOpen] = useState<boolean>(false);

  return (
    <>
      <MenuWindow isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />

      <div style={{ position: "fixed", zIndex: 2 }}>
        <MenuBtn isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />  
        <RotateButtons />
        <CancelMoveBtn />
        <CurrentScore />
        <BestScore />
        <ResetBtn />
      </div>
      <Canvas>
        <Sound url={audioUrl} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PlayingField />
        <GameFiguresArea />
      </Canvas >
    </>
  )
}

export default App