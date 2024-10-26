export type TSpriteOffsetComponent = {
  x: number;
  y: number;
};

export class SpriteOffsetComponent {
  x: number;
  y: number;

  constructor({ x = 0, y = 0 }: TSpriteOffsetComponent) {
    this.x = x;
    this.y = y;
  }
}
