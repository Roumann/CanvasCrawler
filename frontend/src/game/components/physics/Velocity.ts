export type TVelocityComponent = {
  vx: number;
  vy: number;
};

export class VelocityComponent {
  vx: number;
  vy: number;

  constructor({ vx = 0, vy = 0 }: TVelocityComponent) {
    this.vx = vx;
    this.vy = vy;
  }
}
