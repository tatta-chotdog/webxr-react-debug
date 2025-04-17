import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { BUTTON_DIMENSIONS } from "../../constants/dimensions";
import { BUTTON_COLORS, BUTTON_TEXT_COLORS } from "../../constants/colors";
import { BUTTON_TEXT_PROPS } from "../../constants/materials";
import { playButtonSound } from "../../utils/audio";

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
    playButtonSound();
    onClick(e);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const getButtonColor = () => {
    if (customColor) return customColor;
    if (label === "+") return BUTTON_COLORS.CORAL_RED;
    if (label === "-") return BUTTON_COLORS.TURQUOISE;
    if (label === "Exit XR") return BUTTON_COLORS.WHITE;
    return BUTTON_COLORS.DEFAULT_BACKGROUND;
  };

  const getTextColor = () => {
    if (label === "Exit XR") return BUTTON_TEXT_COLORS.EXIT_XR;
    return BUTTON_TEXT_COLORS.DEFAULT;
  };

  return (
    <group position={position}>
      <animated.group scale={scale}>
        <RoundedBox
          args={[dimensions.width, dimensions.height, dimensions.depth * 0.1]}
          radius={dimensions.radius}
          smoothness={dimensions.smoothness}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          pointerEventsType={{ deny: "grab" }}
          position={[0, 0, dimensions.depth * 0.1]}
        >
          <meshBasicMaterial color={getButtonColor()} />
        </RoundedBox>
        <Text
          position={[0, 0, dimensions.depth * 0.1 + 0.001]}
          fontSize={dimensions.fontSize}
          color={getTextColor()}
          {...BUTTON_TEXT_PROPS}
        >
          {label}
        </Text>
      </animated.group>
    </group>
  );
};
