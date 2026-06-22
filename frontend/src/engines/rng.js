// frontend/src/engines/rng.js
export default class AdvancedRNG {
  constructor(seed = Date.now()) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  int(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  float(min, max) {
    return this.next() * (max - min) + min;
  }

  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }

  pickMultiple(arr, count) {
    const shuffled = [...arr];
    for (let i = 0; i < count && i < shuffled.length; i++) {
      const j = i + Math.floor(this.next() * (shuffled.length - i));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  color() {
    const hue = Math.floor(this.next() * 360);
    const saturation = this.int(50, 100);
    const lightness = this.int(40, 60);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  colorHex() {
    return '#' + Math.floor(this.next() * 16777215).toString(16).padStart(6, '0');
  }

  bool(probability = 0.5) {
    return this.next() < probability;
  }
}