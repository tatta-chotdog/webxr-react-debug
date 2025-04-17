import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useBoxStore } from "../../stores/boxStore";
import { useXR } from "@react-three/xr";
import { Control } from "./Control";
import { ColorControl } from "./ColorControl";
import { Button } from "./Button";
import { PANEL_POSITION } from "../../constants/positions";
import { PANEL_DIMENSIONS, FONT_SIZES } from "../../constants/dimensions";
import {
  TITLE_TEXT_PROPS,
  BACKGROUND_MATERIAL_PROPS,
} from "../../constants/materials";
import { COLORS } from "../../constants/colors";

export const DebugPanel = () => {
  const panelRef = useRef<THREE.Group>(null);
  const { color, setColor, rotationSpeed, setRotationSpeed, scale, setScale } =
    useBoxStore();
  const { session } = useXR();

  // パネルの位置をカメラに追従させる
  useFrame(({ camera }) => {
    if (panelRef.current) {
      const centerVector = new THREE.Vector3(
        PANEL_POSITION.x,
        PANEL_POSITION.y,
        PANEL_POSITION.z
      );
      panelRef.current.position.copy(centerVector);

      // カメラの向きをコピー
      const quaternion = new THREE.Quaternion().copy(camera.quaternion);
      // 上向きに15度傾ける
      const tilt = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        THREE.MathUtils.degToRad(-15)
      );
      quaternion.multiply(tilt);
      panelRef.current.quaternion.copy(quaternion);
    }
  });

  const handleSpeedChange = (newSpeed: number) => {
    setRotationSpeed(newSpeed);
  };

  const handleScaleChange = (delta: number) => {
    const newScale = Math.min(Math.max(scale + delta, 0.5), 2);
    setScale(newScale);
  };

  const handleColorClick = () => {
    const currentIndex = COLORS.indexOf(color);
    const nextIndex = (currentIndex + 1) % COLORS.length;
    setColor(COLORS[nextIndex]);
  };

  const handleExitXR = async () => {
    if (session) {
      await session.end();
    }
  };

  return (
    <group ref={panelRef}>
      <RoundedBox
        args={[
          PANEL_DIMENSIONS.width,
          PANEL_DIMENSIONS.height,
          PANEL_DIMENSIONS.depth,
        ]}
        radius={PANEL_DIMENSIONS.radius}
        smoothness={PANEL_DIMENSIONS.smoothness}
      >
        <meshBasicMaterial {...BACKGROUND_MATERIAL_PROPS} />
      </RoundedBox>

      <Text
        position={[0, 0.11, 0.02]}
        fontSize={FONT_SIZES.title}
        {...TITLE_TEXT_PROPS}
      >
        Debug Panel
      </Text>

      <ColorControl onClick={handleColorClick} />
      <Control
        type="speed"
        value={rotationSpeed}
        onIncrease={() => handleSpeedChange(rotationSpeed + 0.5)}
        onDecrease={() => handleSpeedChange(rotationSpeed - 0.5)}
        onChange={handleSpeedChange}
      />
      <Control
        type="scale"
        value={scale}
        onIncrease={() => handleScaleChange(0.1)}
        onDecrease={() => handleScaleChange(-0.1)}
      />
      <Button
        position={[0, -0.115, 0.02]}
        onClick={handleExitXR}
        label="Exit XR"
        isWide={true}
      />
    </group>
  );
};
