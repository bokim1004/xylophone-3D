import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { getKeyLength } from "../utils";
import XyloKey from "./XyloKey";
import { useNoteSound } from "./useNoteSound";


interface XylophoneProps {
  setCurrentNote: (note: string) => void;
}

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

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

export default function Xylophone({ setCurrentNote }: XylophoneProps){
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { play } = useNoteSound();

  const [pressedNote, setPressedNote] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = (e:MouseEvent) => {
        // 1. 마우스 좌표 → NDC (-1 ~ 1) 로 변환
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    // 2. raycaster로 해당 위치에서 ray 쏘기
      raycaster.current.setFromCamera(mouse.current, camera);
        // 3. 장면 내 오브젝트와 충돌 확인
      const intersects = raycaster.current.intersectObjects(scene.children);
        // 4. 충돌된 첫 오브젝트의 userData.note 확인 → 재생
      if(intersects.length > 0){
        const key = intersects[0].object;
        const note = key.userData.note;
        if (note) {
          setPressedNote(note);
          setCurrentNote(note);
          play(note);
          setTimeout(() => setPressedNote(null), 200); // 0.2초 후 원위치
        }
      }
    }

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);

  },[camera,scene,play])



  return(
    <>
    {notes.map((note, i) => (
      <XyloKey
        key={note}
        note={note}
        position={[i * 1.2 - 4, 0, 0]}
        color={getColor(note)}
        height={getKeyLength(i,notes.length)}
        isPressed={pressedNote === note}
      />
    ))}
  </>
  )
}