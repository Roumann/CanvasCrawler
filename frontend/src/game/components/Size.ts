export type TSizeComponent = {
  w: number;
  h: number;
};

export class SizeComponent {
  w: number;
  h: number;

  constructor({ w = 32, h = 32 }: TSizeComponent) {
    this.w = w;
    this.h = h;
  }

  get size() {
    return { w: this.w, h: this.h };
  }
}
