export class SizeComponent {
  w: number;
  h: number;

  constructor(w = 32, h = 32) {
    this.w = w;
    this.h = h;
  }

  get size() {
    return { w: this.w, h: this.h };
  }
}
