import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Xylophone from './components/Xylophone';

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 5]} castShadow intensity={1} />
      <Xylophone />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
