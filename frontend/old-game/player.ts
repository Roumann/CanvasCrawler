import { PlayerAnimations, playerAnimations } from "../animations/player";
import { Controlls } from "./controlls";
import { GameObject } from "./game-object";
import { CollisionSystem } from "./systems/CollisionSystem";

import { Vector2 } from "./vector2";
import { Weapon } from "./weapon";

export class Player extends GameObject {
  controlls: Controlls;
  speed: number;
  direction: string;
  collisionSystem: CollisionSystem;
  weapon: Weapon;
  isAttacking: boolean;

  constructor({ position, size }: { position: Vector2; size: Vector2 }) {
    super({
      position,
      size,
      src: "/characters/char_4.png",
      animationMap: playerAnimations,
      currentAnimation: "idle-right" as PlayerAnimations,
      frameRate: 28,
    });
    this.direction = "right";
    this.speed = 0.5;
    this.controlls = new Controlls(this);
    this.controlls.addEventListeners();
    this.collisionSystem = new CollisionSystem(this);
    this.isAttacking = false;

    this.weapon = new Weapon({
      owner: this,
      size: new Vector2(16, 16),
      position: new Vector2(this.position.x + 10, this.position.y),
    });
  }
  update() {
    this.controlls.update();
    this.collisionSystem.check();
    this.weapon.update();
  }
}
