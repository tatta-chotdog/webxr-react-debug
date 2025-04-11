// Colors
export const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
export const BACKGROUND_COLOR = "#2A2A2A";

// Positions
export const PANEL_POSITION = {
  x: 0.05,
  y: -0.2,
  z: -0.45,
} as const;

export const CONTROL_POSITIONS = {
  title: [0, 0.11, 0.02],
  color: [0, 0.06, 0.02],
  speed: [0, 0.0, 0.02],
  scale: [0, -0.06, 0.02],
  xr: [0, -0.115, 0.02],
  label: [-0.12, 0, 0],
} as const;

// Dimensions
export const PANEL_DIMENSIONS = {
  width: 0.35,
  height: 0.3,
  depth: 0.02,
  radius: 0.02,
  smoothness: 4,
} as const;

// Font sizes
export const FONT_SIZES = {
  title: 0.02,
  label: 0.015,
  value: 0.015,
} as const;

// Value ranges
export const VALUE_RANGES = {
  speed: {
    min: 0,
    max: 5,
  },
  scale: {
    min: 0.5,
    max: 2,
  },
} as const;

// Common component props
export const COMMON_TEXT_PROPS = {
  color: "white",
  anchorX: "left",
} as const;

export const TITLE_TEXT_PROPS = {
  ...COMMON_TEXT_PROPS,
  anchorX: "center" as const,
  anchorY: "middle" as const,
} as const;

export const COMMON_MATERIAL_PROPS = {
  transparent: true,
} as const;

export const BACKGROUND_MATERIAL_PROPS = {
  ...COMMON_MATERIAL_PROPS,
  color: BACKGROUND_COLOR,
  opacity: 0.9,
} as const;

// Button dimensions
export const BUTTON_DIMENSIONS = {
  standard: {
    width: 0.025,
    height: 0.025,
    depth: 0.01,
    radius: 0.005,
    smoothness: 4,
    fontSize: 0.015,
  },
  wide: {
    width: 0.07,
    height: 0.025,
    depth: 0.01,
    radius: 0.005,
    smoothness: 4,
    fontSize: 0.015,
  },
} as const;

// Button positions
export const BUTTON_POSITIONS = {
  plus: [0.1, 0, 0.01],
  minus: [-0.02, 0, 0.01],
  color: [0.04, 0, 0.01],
  value: [0.03, 0, 0.01],
} as const;

// Button materials
export const BUTTON_MATERIALS = {
  default: "#444444",
  hover: "#4CAF50",
  metalness: 0.5,
  roughness: 0.5,
} as const;
