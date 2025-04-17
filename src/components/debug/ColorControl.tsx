import { ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Button } from "./Button";
import { useBoxStore } from "../../stores/boxStore";
import { COLORS } from "../../constants/colors";
import { CONTROL_POSITIONS, BUTTON_POSITIONS } from "../../constants/positions";
import { FONT_SIZES } from "../../constants/dimensions";

interface ColorControlProps {
  onClick: (e: ThreeEvent<PointerEvent>) => void;
}

export const ColorControl = ({ onClick }: ColorControlProps) => {
  const { color } = useBoxStore();

  const handleButtonClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onClick(e);
  };

  // 次の色を取得
  const nextColor = COLORS[(COLORS.indexOf(color) + 1) % COLORS.length];

  return (
    <group position={CONTROL_POSITIONS.color}>
      <Text
        position={CONTROL_POSITIONS.label}
        fontSize={FONT_SIZES.label}
        color="white"
        anchorX="left"
      >
        🎨Color:
      </Text>
      <Button
        position={BUTTON_POSITIONS.color as [number, number, number]}
        onClick={handleButtonClick}
        label=""
        isWide={true}
        customColor={nextColor}
      />
    </group>
  );
};
