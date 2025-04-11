import { create } from "zustand";
import { COLORS } from "../constants/debugPanel";

interface BoxState {
  color: string;
  rotationSpeed: number;
  scale: number;
  setColor: (color: string) => void;
  setRotationSpeed: (speed: number) => void;
  setScale: (scale: number) => void;
}

export const useBoxStore = create<BoxState>((set) => ({
  color: COLORS[0],
  rotationSpeed: 1,
  scale: 1,
  setColor: (color) => set({ color }),
  setRotationSpeed: (rotationSpeed) => set({ rotationSpeed }),
  setScale: (scale) => set({ scale }),
}));
