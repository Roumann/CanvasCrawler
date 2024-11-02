export type TDamageComponent = {
  value: number;
};

export class DamageComponent {
  value: number;

  constructor({ value }: TDamageComponent) {
    this.value = value;
  }
}
