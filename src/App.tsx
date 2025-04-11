import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, useXR } from "@react-three/xr";
import { XRDevice, metaQuest3 } from "iwer";
import { Box } from "./components/Box";
import { DebugPanel } from "./components/DebugPanel";
import "./styles/styles.css";

const store = createXRStore();

const XRContent = () => {
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

const App = () => {
  useEffect(() => {
    const initializeXR = async () => {
      try {
        if (!navigator.xr) {
          console.error("WebXR API is not supported");
          return;
        }

        // PC上でデバッグするためのXRデバイスエミュレーション
        // 実機での動作確認時は、この部分をコメントアウトしてください
        const xrDevice = new XRDevice(metaQuest3);
        xrDevice.installRuntime();

        const isSupported = await navigator.xr.isSessionSupported(
          "immersive-vr"
        );

        if (!isSupported) {
          console.error("VR is not supported on this device");
          return;
        }

        try {
          await store.enterVR();
        } catch (error) {
          console.error("Failed to auto-start XR session:", error);
        }
      } catch (error) {
        console.error("Failed to initialize XR:", error);
      }
    };

    initializeXR();
  }, []);

  return (
    <div className="canvas-wrapper">
      <Canvas>
        <XR store={store}>
          <XRContent />
        </XR>
      </Canvas>
    </div>
  );
};

export default App;
