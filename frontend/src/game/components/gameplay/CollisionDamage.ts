export type TCollisionDamageComponent = {
  damage: number;
};

export class CollisionDamageComponent {
  damage: number;

  constructor({ damage }: TCollisionDamageComponent) {
    this.damage = damage;
  }
}
