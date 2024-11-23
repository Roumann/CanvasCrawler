export type TLifeTimeComponent = {
  time: number;
};

export class LifeTimeComponent {
  time: number;

  constructor({ time }: TLifeTimeComponent) {
    this.time = time;
  }
}
