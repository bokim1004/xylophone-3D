/** 실로폰 건반 하나 */
import { ThreeElements } from '@react-three/fiber';

import { memo } from 'react';

type MeshProps = ThreeElements['mesh'];

interface XyloKeyProps extends MeshProps {
  note: string;
  color: string;
}

function XyloKey({ note, color, ...props }: XyloKeyProps){
  return(
    <mesh
    {...props}
    castShadow
    receiveShadow
    userData={{ note }}
  >
    <boxGeometry args={[1, 0.3, 0.5]} />
    <meshStandardMaterial color={color} />
  </mesh>
  )
}

export default memo(XyloKey);