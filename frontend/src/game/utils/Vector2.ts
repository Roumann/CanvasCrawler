export type TVect2 = {
  x?: number;
  y?: number;
};

export class Vector2 {
  x: number;
  y: number;

  constructor({ x = 0, y = 0 }: TVect2) {
    this.x = x;
    this.y = y;
  }
}
