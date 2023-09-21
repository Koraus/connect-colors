import { Canvas } from '@react-three/fiber'
import './App.css'
import { PlayingField } from './playing-field';
import { ResetBtn } from './reset-btn';
import { GameFiguresArea } from './game-figures-area';
import { RotateButtons } from './rotate-buttons';
import { FieldSizeInput } from './field-size-input';



function App() {

  return (
    <>
      <FieldSizeInput />
      <RotateButtons />
      <ResetBtn />
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