import { useXR } from "@react-three/xr";
import { Box } from "./Box";
import { DebugPanel } from "./DebugPanel";

export const Experience = () => {
  const { session } = useXR();
  if (!session) return null;

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, 5, -5]} intensity={1} />
      <pointLight position={[0, 5, -10]} intensity={0.8} />
      <Box />
      <DebugPanel />
    </>
  );
};
