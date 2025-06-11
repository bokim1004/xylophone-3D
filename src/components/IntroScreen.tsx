import { animated, useSpring } from "@react-spring/three";
import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function IntroScreen({ onStart }: { onStart: () => void }) {

  const { positionX, scale } = useSpring({
    from: { positionX: 8, scale: 1.1 },
    to: async (next) => {
      await next({ positionX: 0, scale: 1.2 });
      await next({ scale: 1.0 }); // 살짝 bounce 후 멈춤
    },
    config: { tension: 200, friction: 12 },
    delay: 300,
  });


  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: "100vw", height: "100vh", background: "#111" }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <animated.group position-x={positionX} scale={scale}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.2}
            bevelEnabled
            bevelSize={0.03}
            bevelThickness={0.05}
          >
            Xylophone
            <meshStandardMaterial color="white" />
          </Text3D>
        </Center>
        </animated.group>
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Play 버튼 (DOM 위에 뜨는 방식) */}
      <button
        onClick={onStart}
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '16px 48px',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#111',
          background: 'white',
          border: 'none',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px 5px rgba(255, 255, 255, 0.4)';
          e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
        }}
      >
        Play
      </button>
    </>
  );
}
export default IntroScreen;