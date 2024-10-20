export class HealthComponent {
  health: number;
  maxHealth: number;

  constructor(health = 100, maxHealth = 100) {
    this.health = health;
    this.maxHealth = maxHealth;
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }
}
