import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './App.css';
import Xylophone from './components/Xylophone';

function App() {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  useEffect(() => {
    if (currentNote) {
      const timer = setTimeout(() => setCurrentNote(null), 1000); // 1초 후 사라짐
      return () => clearTimeout(timer);
    }
  }, [currentNote]);

  console.log("currentNote",currentNote)

  return (
    <>
    <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}   style={{ width: '100vw',height: '100vh',background: '#1a1a1a' }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 40, 5]} castShadow intensity={1} />
      <Xylophone setCurrentNote={setCurrentNote}  />
      <OrbitControls />
    </Canvas>

<AnimatePresence>
{currentNote && (
  <motion.div
    key={currentNote}
    initial={{ opacity: 0, y: 30, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.5 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    style={{
      position: 'absolute',
      bottom: 80,
      width: '100%',
      textAlign: 'center',
      fontSize: '4rem',
      color: 'white',
      fontWeight: 'bold',
      textShadow: '0 0 10px #aaa',
      pointerEvents: 'none',
    }}
  >
{currentNote.replace(/\d/g, '')}
  </motion.div>
)}
</AnimatePresence>
</>
  );
}

export default App;
