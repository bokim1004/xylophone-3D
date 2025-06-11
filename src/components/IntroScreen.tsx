import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: "100vw", height: "100vh", background: "#111" }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={1.2}
            height={0.2}
            bevelEnabled
            bevelSize={0.03}
            bevelThickness={0.05}
          >
            Xylophone
            <meshStandardMaterial color="white" />
          </Text3D>
        </Center>

        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Play 버튼 (DOM 위에 뜨는 방식) */}
      <button
        onClick={onStart}
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "16px 32px",
          fontSize: "1.5rem",
          background: "#fff",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(255,255,255,0.2)",
          cursor: "pointer",
          transition: "transform 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1)")}
      >
        Play
      </button>
    </>
  );
}
export default IntroScreen;