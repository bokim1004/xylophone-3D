import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import XyloKey from "./XyloKey";

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

function getColor(note: string) {
  const colors: Record<string, string> = {
    C: '#f87171',
    D: '#fb923c',
    E: '#facc15',
    F: '#4ade80',
    G: '#60a5fa',
    A: '#a78bfa',
    B: '#f472b6',
  };
  return colors[note] ?? '#ffffff';
}

export default function Xylophone(){
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());


  useEffect(() => {
    const handleClick = (e:MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children);
      if(intersects.length > 0){
        const key = intersects[0].object;
        const note = key.userData.note;
        // if (note) play(note);
      }
    }

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);

  },[camera,scene])



  return(
    <>
    {notes.map((note, i) => (
      <XyloKey
        key={note}
        note={note}
        position={[i * 1.2 - 4, 0, 0]}
        color={getColor(note)}
      />
    ))}
  </>
  )
}