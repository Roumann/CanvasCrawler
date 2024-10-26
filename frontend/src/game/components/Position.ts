export type TPositionComponent = {
  x: number;
  y: number;
};

export class PositionComponent {
  x: number;
  y: number;

  constructor({ x = 0, y = 0 }: TPositionComponent) {
    this.x = x;
    this.y = y;
  }
}
