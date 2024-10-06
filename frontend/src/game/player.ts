import { HeroAnimations, heroAnimations } from "../animations/hero";
import { Controlls } from "./controlls";
import { GameObject } from "./game-object";
import { Vector2 } from "./vector2";

export class Player extends GameObject {
  controlls: Controlls;

  constructor({ position, size }: { position: Vector2; size: Vector2 }) {
    super({
      position,
      size,
      src: "/characters/char_1.png",
      animationMap: heroAnimations,
      currentAnimation: "idle-down" as HeroAnimations,
    });
    this.controlls = new Controlls();
    this.controlls.addEventListeners();
  }

  update() {
    if (!this.controlls) {
      return;
    }

    if (this.controlls.left) {
      console.log("left");
      this.sprite.currentAnimation = "walk-left";
      this.position.x -= 0.5;
    } else if (this.controlls.right) {
      this.sprite.currentAnimation = "walk-right";
      this.position.x += 0.5;
    } else if (this.controlls.up) {
      this.sprite.currentAnimation = "walk-up";
      this.position.y -= 0.5;
    } else if (this.controlls.down) {
      this.sprite.currentAnimation = "walk-down";
      this.position.y += 0.5;
    } else {
      this.sprite.currentAnimation = "idle-down";
    }
  }
}
