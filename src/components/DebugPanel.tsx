import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useBoxStore } from "../stores/boxStore";
import { ThreeEvent } from "@react-three/fiber";
import {
  COLORS,
  PANEL_POSITION,
  CONTROL_POSITIONS,
  PANEL_DIMENSIONS,
  FONT_SIZES,
  VALUE_RANGES,
  COMMON_TEXT_PROPS,
  TITLE_TEXT_PROPS,
  BACKGROUND_MATERIAL_PROPS,
  BUTTON_DIMENSIONS,
  BUTTON_POSITIONS,
  BUTTON_MATERIALS,
} from "../constants/debugPanel";
import { useXR } from "@react-three/xr";

// ボタンのコンポーネント
const Button = ({
  position,
  onClick,
  label,
  isWide = false,
  customColor,
}: {
  position: [number, number, number];
  onClick: (e: ThreeEvent<PointerEvent>) => void;
  label: string;
  isWide?: boolean;
  customColor?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const dimensions = isWide
    ? BUTTON_DIMENSIONS.wide
    : BUTTON_DIMENSIONS.standard;

  // カスタムカラーがある場合は、その色をベースに状態に応じた色を計算
  const getButtonColor = () => {
    if (customColor) {
      return customColor;
    }

    const baseColor =
      isHovered || isPressed
        ? BUTTON_MATERIALS.hover
        : BUTTON_MATERIALS.default;
    if (isPressed) {
      // ホバー色をベースに明るさを10%上げる
      const color = new THREE.Color(baseColor);
      const hsl = { h: 0, s: 0, l: 0 };
      color.getHSL(hsl);
      color.setHSL(hsl.h, hsl.s, Math.min(1, hsl.l + 0.3));
      return "#" + color.getHexString();
    }
    return baseColor;
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsPressed(true);
    onClick(e);
    setTimeout(() => setIsPressed(false), 300);
  };

  const buttonMaterial = {
    color: getButtonColor(),
    metalness: BUTTON_MATERIALS.metalness,
    roughness: BUTTON_MATERIALS.roughness,
  };

  return (
    <group position={position}>
      <RoundedBox
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        radius={dimensions.radius}
        smoothness={dimensions.smoothness}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
      >
        <meshStandardMaterial {...buttonMaterial} />
      </RoundedBox>
      <Text
        position={[0, 0, dimensions.depth / 2 + 0.001]}
        fontSize={dimensions.fontSize}
        {...COMMON_TEXT_PROPS}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

// スライダーコンポーネント
const Slider = ({
  value,
  min,
  max,
  onChange,
  position,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  position: [number, number, number];
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<THREE.Group>(null);
  const trackWidth = 0.12;
  const trackHeight = 0.01;
  const knobRadius = 0.01;

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
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
      {/* トラック */}
      <RoundedBox
        args={[trackWidth, trackHeight, 0.005]}
        radius={0.002}
        smoothness={4}
      >
        <meshStandardMaterial color="#444444" />
      </RoundedBox>

      {/* ノブ */}
      <mesh position={knobPosition}>
        <sphereGeometry args={[knobRadius, 32, 32]} />
        <meshStandardMaterial color={isDragging ? "#4CAF50" : "#666666"} />
      </mesh>
    </group>
  );
};

// コントロールのコンポーネント
const Control = ({
  type,
  value,
  onIncrease,
  onDecrease,
  onChange,
}: {
  type: "speed" | "scale";
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange?: (value: number) => void;
}) => {
  return (
    <group position={CONTROL_POSITIONS[type]}>
      <Text
        position={CONTROL_POSITIONS.label}
        fontSize={FONT_SIZES.label}
        {...COMMON_TEXT_PROPS}
      >
        {type === "speed" ? "💫Speed:" : "📏Scale:"}
      </Text>
      {type === "scale" && (
        <Text
          position={BUTTON_POSITIONS.value}
          fontSize={FONT_SIZES.label}
          {...COMMON_TEXT_PROPS}
        >
          {value.toFixed(1)}
        </Text>
      )}
      {type === "speed" && onChange ? (
        <Slider
          value={value}
          min={VALUE_RANGES.speed.min}
          max={VALUE_RANGES.speed.max}
          onChange={onChange}
          position={[0.04, 0, 0.01]}
        />
      ) : (
        <>
          <Button
            position={[...BUTTON_POSITIONS.plus]}
            onClick={() => onIncrease()}
            label="+"
          />
          <Button
            position={[...BUTTON_POSITIONS.minus]}
            onClick={() => onDecrease()}
            label="-"
          />
        </>
      )}
    </group>
  );
};

// カラーコントロールのコンポーネント
const ColorControl = ({
  onClick,
}: {
  onClick: (e: ThreeEvent<PointerEvent>) => void;
}) => {
  const { color } = useBoxStore();

  const handleButtonClick = (e: ThreeEvent<PointerEvent>) => {
    onClick(e);
  };

  // 次の色を取得
  const nextColor = COLORS[(COLORS.indexOf(color) + 1) % COLORS.length];

  return (
    <group position={CONTROL_POSITIONS.color}>
      <Text
        position={CONTROL_POSITIONS.label}
        fontSize={FONT_SIZES.label}
        {...COMMON_TEXT_PROPS}
      >
        🎨Color:
      </Text>
      <Button
        position={[...BUTTON_POSITIONS.color]}
        onClick={handleButtonClick}
        label="Change"
        isWide={true}
        customColor={nextColor}
      />
    </group>
  );
};

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
      centerVector.applyQuaternion(camera.quaternion);

      panelRef.current.position.copy(camera.position);
      panelRef.current.position.add(centerVector);

      const panelQuaternion = camera.quaternion.clone();
      const tiltQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        -0.4
      );
      panelQuaternion.multiply(tiltQuaternion);
      panelRef.current.quaternion.copy(panelQuaternion);
    }
  });

  const handleSpeedChange = (newSpeed: number) => {
    setRotationSpeed(newSpeed);
  };

  const handleScaleChange = (delta: number) => {
    const newScale = Math.min(
      Math.max(scale + delta, VALUE_RANGES.scale.min),
      VALUE_RANGES.scale.max
    );
    setScale(newScale);
  };

  const handleColorClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const newValue = COLORS[(COLORS.indexOf(color) + 1) % COLORS.length];
    setColor(newValue);
  };

  const handleExitXR = async () => {
    if (session) {
      await session.end();
    }
  };

  return (
    <group ref={panelRef}>
      {/* 背景パネル */}
      <RoundedBox
        args={[
          PANEL_DIMENSIONS.width,
          PANEL_DIMENSIONS.height,
          PANEL_DIMENSIONS.depth,
        ]}
        radius={PANEL_DIMENSIONS.radius}
        smoothness={PANEL_DIMENSIONS.smoothness}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial {...BACKGROUND_MATERIAL_PROPS} />
      </RoundedBox>

      {/* タイトル */}
      <Text
        position={CONTROL_POSITIONS.title}
        fontSize={FONT_SIZES.title}
        {...TITLE_TEXT_PROPS}
      >
        ⚙️Debug Panel
      </Text>

      {/* コントロール */}
      <ColorControl onClick={handleColorClick} />
      <Control
        type="speed"
        value={rotationSpeed}
        onIncrease={() => handleSpeedChange(rotationSpeed + 0.1)}
        onDecrease={() => handleSpeedChange(rotationSpeed - 0.1)}
        onChange={handleSpeedChange}
      />
      <Control
        type="scale"
        value={scale}
        onIncrease={() => handleScaleChange(0.1)}
        onDecrease={() => handleScaleChange(-0.1)}
      />

      {/* Exit XRボタン */}
      <group position={CONTROL_POSITIONS.xr}>
        <Button
          position={[0, 0, 0]}
          onClick={handleExitXR}
          label="Exit XR"
          isWide={true}
        />
      </group>
    </group>
  );
};
