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


function App() {

  const [isMenuOpen, setIsmenueOpen] = useState<boolean>(true);
  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsmenueOpen(!isMenuOpen)
      }
    })
    return () => {
      removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsmenueOpen(!isMenuOpen)
        }
      })
    }
  }, [])

  return (
    <>
      <MenuWindow isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
      <MenuBtn isOpen={isMenuOpen} setIsOpen={setIsmenueOpen} />
      <div style={{ position: "fixed", zIndex: 2 }}>
        <RotateButtons />
        <CancelMoveBtn />
        <CurrentScore />
        <BestScore />
        <ResetBtn />
      </div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PlayingField />
        <GameFiguresArea />
      </Canvas >
    </>
  )
}

export default App