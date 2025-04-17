export const PANEL_DIMENSIONS = {
  width: 0.35,
  height: 0.3,
  depth: 0.02,
  radius: 0.02,
  smoothness: 4,
} as const;

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

export const FONT_SIZES = {
  title: 0.02,
  label: 0.015,
  value: 0.015,
} as const;
