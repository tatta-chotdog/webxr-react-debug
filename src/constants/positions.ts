export const PANEL_POSITION = {
  x: 0,
  y: 1.05,
  z: -0.4,
} as const;

export const CONTROL_POSITIONS = {
  title: [0, 0.11, 0.02],
  color: [0, 0.06, 0.02],
  speed: [0, 0.0, 0.02],
  scale: [0, -0.06, 0.02],
  xr: [0, -0.115, 0.02],
  label: [-0.12, 0, 0],
} as const;

export const BUTTON_POSITIONS = {
  plus: [0.1, 0, 0.01],
  minus: [-0.02, 0, 0.01],
  color: [0.04, 0, 0.01],
  value: [0.04, 0, 0.01],
} as const;
