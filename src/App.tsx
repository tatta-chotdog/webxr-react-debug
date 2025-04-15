import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { XRDevice, metaQuest3 } from "iwer";
import { Experience } from "./components/Experience";
import "./styles/styles.css";

const store = createXRStore();

export const App = () => {
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
          <Experience />
        </XR>
      </Canvas>
    </div>
  );
};
