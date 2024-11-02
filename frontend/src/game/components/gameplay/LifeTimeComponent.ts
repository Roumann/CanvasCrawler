export type TLifeTImeComponent = {
  time: number;
};

export class LifeTimeComponent {
  time: number;

  constructor({ time }: TLifeTImeComponent) {
    this.time = time;
  }
}
