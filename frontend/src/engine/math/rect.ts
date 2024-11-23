export type TRect = { x: number; y: number; w: number; h: number };

export class Rect {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor({ x = 0, y = 0, w = 0, h = 0 }: TRect) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
