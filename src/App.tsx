import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Experience } from "./components/Experience";
import { Title } from "./components/Title";
import { useXRStore } from "./stores/useXRStore";
import "./styles/styles.css";

const store = createXRStore();

export const App = () => {
  const { setIsInVR } = useXRStore();

  useEffect(() => {
    const handleSessionStart = () => setIsInVR(true);
    const handleSessionEnd = () => setIsInVR(false);

    store.subscribe((state) => {
      if (state.session) {
        handleSessionStart();
      } else {
        handleSessionEnd();
      }
    });

    return () => {
      store.destroy();
    };
  }, [setIsInVR]);

  return (
    <div className="canvas-wrapper">
      <Title />
      <Canvas shadows>
        <XR store={store}>
          <Experience />
        </XR>
      </Canvas>
    </div>
  );
};
