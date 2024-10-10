import { CharTwoAnimations, charTwoAnimations } from "../animations/hero";
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
      animationMap: charTwoAnimations,
      currentAnimation: "idle-left" as CharTwoAnimations,
      frameRate: 32,
    });
    this.direction = "right";
    this.controlls = new Controlls(this);
    this.controlls.addEventListeners();
    this.speed = 3;
  }

  update() {
    this.controlls.update();
  }
}
