export function playSound(src) {
  try {
    const audio = new Audio(src);
    audio.volume = 0.7;
    audio.play();
  } catch (e) {
    // silent fail (no crash)
  }
}