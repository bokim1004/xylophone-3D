/** 실로폰 건반 하나 */
import { animated, useSpring } from "@react-spring/three";
import { ThreeElements } from '@react-three/fiber';
import { memo } from 'react';

type MeshProps = ThreeElements['mesh'];

interface XyloKeyProps extends MeshProps {
  note: string;
  color: string;
  height:number;
  position: [number, number, number];
  isPressed: boolean;
}

function XyloKey({ note, color,height,position,isPressed, ...props }: XyloKeyProps){
  const { y } = useSpring({
    y: isPressed ? position[1] - 0.1 : position[1],
    config: { tension: 300, friction: 10 },
  });

  const { emissiveIntensity } = useSpring({
    emissiveIntensity: isPressed ? 0.4 : 0.2,
    config: { tension: 300, friction: 10 },
  });

  return(
    <animated.mesh
    position-x={position[0]}
    position-y={y}
    position-z={position[2]}
    rotation-x={-Math.PI / 1.7}
    castShadow
    receiveShadow
    userData={{ note }}
  >
    <boxGeometry args={[1, 0.3, height]} />
    <animated.meshStandardMaterial  
     color="#cccccc"       
     metalness={1}           
     roughness={0.1}
     emissive="#ffffff"
     emissiveIntensity={emissiveIntensity}   
         />
  </animated.mesh>
  )
}

export default memo(XyloKey);