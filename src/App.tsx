import { Canvas } from '@react-three/fiber'
import './App.css'

import { PlayingField } from './playing-field';
import { GameFigure } from './game-figure';




function App() {
  return (
    <Canvas  >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <PlayingField />

      <GameFigure
      />

    </Canvas>
  )
}

export default App