import { Text } from "@react-three/drei";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { CONTROL_POSITIONS, BUTTON_POSITIONS } from "../../constants/positions";
import { FONT_SIZES } from "../../constants/dimensions";
import { VALUE_RANGES } from "../../constants/types";
import { LABEL_TEXT_PROPS, BUTTON_TEXT_PROPS } from "../../constants/materials";

interface ControlProps {
  type: "speed" | "scale";
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange?: (value: number) => void;
}

export const Control = ({
  type,
  value,
  onIncrease,
  onDecrease,
  onChange,
}: ControlProps) => {
  return (
    <group position={CONTROL_POSITIONS[type]}>
      <Text
        position={CONTROL_POSITIONS.label}
        fontSize={FONT_SIZES.label}
        {...LABEL_TEXT_PROPS}
      >
        {type === "speed" ? "💫Speed:" : "📏Scale:"}
      </Text>
      {type === "scale" && (
        <Text
          position={BUTTON_POSITIONS.value}
          fontSize={FONT_SIZES.label}
          {...BUTTON_TEXT_PROPS}
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
            position={BUTTON_POSITIONS.plus as [number, number, number]}
            onClick={() => onIncrease()}
            label="+"
          />
          <Button
            position={BUTTON_POSITIONS.minus as [number, number, number]}
            onClick={() => onDecrease()}
            label="-"
          />
        </>
      )}
    </group>
  );
};
