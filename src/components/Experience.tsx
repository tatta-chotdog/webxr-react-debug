import { Box } from "./Box";
import { DebugPanel } from "./debug/DebugPanel";
import { useXRStore } from "../stores/useXRStore";

export const Experience = () => {
  const { isInVR } = useXRStore();

  if (!isInVR) return null;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 5, -10]} intensity={0.3} />

      <Box />
      <DebugPanel />
    </>
  );
};
