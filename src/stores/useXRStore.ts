import { create } from "zustand";

interface XRState {
  isInVR: boolean;
  setIsInVR: (isInVR: boolean) => void;
}

export const useXRStore = create<XRState>((set) => ({
  isInVR: false,
  setIsInVR: (isInVR) => set({ isInVR }),
}));
