export type TAttackDelayComponent = {
  delay: number;
};

export class AttackDelayComponent {
  delay: number;

  constructor({ delay }: TAttackDelayComponent) {
    this.delay = delay;
  }
}
