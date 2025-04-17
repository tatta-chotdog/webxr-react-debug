export const COMMON_MATERIAL_PROPS = {
  transparent: true,
} as const;

export const BACKGROUND_MATERIAL_PROPS = {
  ...COMMON_MATERIAL_PROPS,
  color: "#2A2A2A",
  opacity: 0.9,
} as const;

export const LABEL_TEXT_PROPS = {
  color: "white",
  anchorX: "left",
} as const;

export const COMMON_TEXT_PROPS = {
  ...LABEL_TEXT_PROPS,
  fontWeight: "bold",
} as const;

export const BUTTON_TEXT_PROPS = {
  anchorX: "center" as const,
  anchorY: "middle" as const,
} as const;

export const TITLE_TEXT_PROPS = {
  ...COMMON_TEXT_PROPS,
  ...BUTTON_TEXT_PROPS,
} as const;

export const SLIDER_MATERIAL_PROPS = {
  color: "#444444",
} as const;
