/** 실로폰 건반 하나 */
import { ThreeElements } from '@react-three/fiber';

import { memo } from 'react';

type MeshProps = ThreeElements['mesh'];

interface XyloKeyProps extends MeshProps {
  note: string;
  color: string;
  height:number
}

function XyloKey({ note, color,height, ...props }: XyloKeyProps){


  return(
    <mesh
    {...props}
    castShadow
    receiveShadow
    userData={{ note }}
  >
    <boxGeometry args={[1, 0.3, height]} />
    <meshStandardMaterial  
     color="#cccccc"       
     metalness={1}           
     roughness={0.2}    />
  </mesh>
  )
}

export default memo(XyloKey);