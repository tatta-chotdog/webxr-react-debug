export const playButtonSound = () => {
  const audio = new Audio("/audio/button.wav");
  audio.play().catch((error) => {
    console.error("Failed to play button sound:", error);
  });
};

let sliderAudio: HTMLAudioElement | null = null;

export const startSliderSound = () => {
  if (!sliderAudio) {
    sliderAudio = new Audio("/audio/slider.wav");
    sliderAudio.loop = true;
  }
  sliderAudio.play().catch((error) => {
    console.error("Failed to play slider sound:", error);
  });
};

export const stopSliderSound = () => {
  if (sliderAudio) {
    sliderAudio.pause();
    sliderAudio.currentTime = 0;
  }
};
