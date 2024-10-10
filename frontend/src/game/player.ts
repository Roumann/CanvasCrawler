import { PlayerAnimations, playerAnimations } from "../animations/player";
import { Controlls } from "./controlls";
import { GameObject } from "./game-object";
import { Vector2 } from "./vector2";

export class Player extends GameObject {
  controlls: Controlls;
  speed: number;
  direction: string;

  constructor({ position, size }: { position: Vector2; size: Vector2 }) {
    super({
      position,
      size,
      src: "/characters/char_4.png",
      animationMap: playerAnimations,
      currentAnimation: "idle-left" as PlayerAnimations,
      frameRate: 28,
    });
    this.direction = "right";
    this.controlls = new Controlls(this);
    this.controlls.addEventListeners();

    this.speed = 0.5;
  }

  update() {
    this.controlls.update();
  }
}
