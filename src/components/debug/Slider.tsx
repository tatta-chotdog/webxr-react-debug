import { useRef, useState } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { SLIDER_MATERIAL_PROPS } from "../../constants/materials";
import { SLIDER_COLORS } from "../../constants/colors";
import { playSliderSound, stopSliderSound } from "../../utils/audio";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  position: [number, number, number];
}

export const Slider = ({
  value,
  min,
  max,
  onChange,
  position,
}: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<THREE.Group>(null);
  const trackWidth = 0.12;
  const trackHeight = 0.01;
  const knobRadius = 0.01;

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    playSliderSound();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    stopSliderSound();
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !sliderRef.current) return;

    const localX = e.point.x - sliderRef.current.position.x;
    const normalizedValue = (localX + trackWidth / 2) / trackWidth;
    const newValue = Math.min(
      Math.max(normalizedValue * (max - min) + min, min),
      max
    );
    onChange(newValue);
  };

  const knobPosition = [
    ((value - min) / (max - min) - 0.5) * trackWidth,
    0,
    0.01,
  ] as [number, number, number];

  return (
    <group
      ref={sliderRef}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <RoundedBox
        args={[trackWidth, trackHeight, 0.005]}
        radius={0.002}
        smoothness={4}
      >
        <meshStandardMaterial {...SLIDER_MATERIAL_PROPS} />
      </RoundedBox>
      <mesh position={knobPosition}>
        <sphereGeometry args={[knobRadius, 32, 32]} />
        <meshStandardMaterial
          color={isDragging ? SLIDER_COLORS.dragging : SLIDER_COLORS.default}
        />
      </mesh>
    </group>
  );
};
