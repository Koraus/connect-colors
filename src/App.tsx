import { Canvas } from '@react-three/fiber'
import './App.css'
import { PlayingField } from './playing-field';
import { ResetBtn } from './reset-btn';
import { GameFiguresArea } from './game-figures-area';
import { RotateButtons } from './rotate-buttons';
import { CurrentScore } from './current-score'


function App() {

  return (
    <>
      <div style={{ position: "fixed", zIndex: 2 }}>
        <RotateButtons />
        <ResetBtn />
        <CurrentScore />
      </div>
      <Canvas  >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PlayingField />
        <GameFiguresArea />
      </Canvas >
    </>
  )
}

export default App