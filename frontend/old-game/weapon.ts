import { GameObject } from "./game-object";
import { Player } from "./player";
import { Vector2 } from "./vector2";

export class Weapon extends GameObject {
  owner: Player;
  attackDamage: number;
  isAttacking: boolean;

  constructor({
    owner,
    size,
    position,
    src = "/items/sword.png",
  }: {
    owner: Player;
    size: Vector2;
    position: Vector2;
    src?: string;
  }) {
    super({
      position,
      size,
      src,
      currentAnimation: "idle",
      frameRate: 32,
    });

    this.owner = owner;
    this.attackDamage = 10;
    this.isAttacking = false;
  }

  update() {
    this.position.x = this.owner.position.x;
    this.position.y = this.owner.position.y;

    if (this.isAttacking) {
      this.performAttack();
    }
  }

  performAttack() {
    console.log("Attacking with weapon!");
  }

  attack() {
    this.isAttacking = true;
  }

  stopAttack() {
    this.isAttacking = false;
  }
}
