import { ThreeEvent } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { BUTTON_DIMENSIONS } from "../../constants/dimensions";
import { useSpring, animated } from "@react-spring/three";
import { useState } from "react";

interface ButtonProps {
  position: [number, number, number];
  onClick: (e: ThreeEvent<PointerEvent>) => void;
  label: string;
  isWide?: boolean;
  customColor?: string;
}

export const Button = ({
  position,
  onClick,
  label,
  isWide = false,
  customColor,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const dimensions = isWide
    ? BUTTON_DIMENSIONS.wide
    : BUTTON_DIMENSIONS.standard;

  const { scale } = useSpring({
    scale: isPressed ? 1.1 : 1,
    config: { tension: 300, friction: 10 },
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsPressed(true);
    onClick(e);
    setTimeout(() => setIsPressed(false), 200);
  };

  // ボタンの種類に応じて色を設定
  const getButtonColor = () => {
    if (customColor) return customColor;
    if (label === "+") return "#FF6B6B"; // コーラルレッド
    if (label === "-") return "#4ECDC4"; // ターコイズ
    if (label === "Exit XR") return "white"; // Debug Panelの文字色と同じ
    return "#3A3A3A"; // デフォルト
  };

  // ボタンの文字色を設定
  const getTextColor = () => {
    if (label === "Exit XR") return "#2A2A2A"; // Debug Panelの背景色と同じ
    return "white"; // デフォルト
  };

  return (
    <group position={position}>
      <animated.group scale={scale}>
        <RoundedBox
          args={[dimensions.width, dimensions.height, dimensions.depth * 0.1]}
          radius={dimensions.radius}
          smoothness={dimensions.smoothness}
          onPointerDown={handlePointerDown}
          pointerEventsType={{ deny: "grab" }}
          position={[0, 0, dimensions.depth * 0.1]}
        >
          <meshBasicMaterial color={getButtonColor()} />
        </RoundedBox>
        <Text
          position={[0, 0, dimensions.depth * 0.1 + 0.001]}
          fontSize={dimensions.fontSize}
          color={getTextColor()}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </animated.group>
    </group>
  );
};
