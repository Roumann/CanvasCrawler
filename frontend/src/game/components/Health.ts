export type THealthComponent = {
  health: number;
};

export class HealthComponent {
  health: number;

  constructor({ health = 100 }: THealthComponent) {
    this.health = health;
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }
}
