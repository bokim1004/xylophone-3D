import { useState } from "react";
import './App.css';
import IntroScreen from "./components/IntroScreen";
import XylophoneScreen from "./components/XylophoneScreen";

function App(){
  const [started, setStarted] = useState(false);
  return (
    <>
      {!started ? (
        <IntroScreen onStart={() => setStarted(true)} />
      ) : (
        <XylophoneScreen />
      )}
    </>
  )
}

export default App;