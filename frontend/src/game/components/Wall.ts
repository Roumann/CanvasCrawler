export class WallComponent {
  w: number;
  h: number;
  x: number;
  y: number;

  constructor(w = 100, h = 100, x = 50, y = 50) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }
}
