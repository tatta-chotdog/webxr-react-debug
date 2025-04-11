import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Box } from "./components/Box";
import { DebugPanel } from "./components/DebugPanel";
import "./styles/styles.css";

const store = createXRStore();

export default function App() {
  return (
    <div className="canvas-wrapper">
      <Canvas>
        <XR store={store}>
          <ambientLight intensity={1.2} />
          <pointLight position={[5, 5, 5]} intensity={2} />
          <pointLight position={[-5, 5, -5]} intensity={1} />
          <pointLight position={[0, 5, -10]} intensity={0.8} />
          <Box />
          <DebugPanel />
        </XR>
      </Canvas>
    </div>
  );
}
