import { PlayerAnimations, playerAnimations } from "../animations/player";
import { Controlls } from "./controlls";
import { GameObject } from "./game-object";
import { Vector2 } from "./vector2";
import { MapObject } from "../../public/maps/map_3";

export class Player extends GameObject {
  controlls: Controlls;
  speed: number;
  direction: string;
  isColiding: boolean;
  walls: any;
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
    this.isColiding = false;
    this.walls = MapObject.layers[1].data;
    this.speed = 3;
  }

  update() {
    const previousPosition = { x: this.position.x, y: this.position.y };

    this.controlls.update();

    let isColliding = false;

    for (let eachRow = 0; eachRow < 100; eachRow++) {
      for (let eachCol = 0; eachCol < 100; eachCol++) {
        let arrayIndex = eachRow * 100 + eachCol;

        if (this.walls[arrayIndex] !== 0) {
          let wall = {
            x: eachCol * 16,
            y: eachRow * 16,
            width: 16,
            height: 16,
          };

          if (
            this.position.x < wall.x + wall.width &&
            this.position.x + this.size.x > wall.x &&
            this.position.y < wall.y + wall.height &&
            this.position.y + this.size.y > wall.y
          ) {
            // Collision detected, mark the player as colliding
            isColliding = true;
            console.log("Collision detected!");

            // Reset position to prevent moving into the wall
            this.position.x = previousPosition.x;
            this.position.y = previousPosition.y;
          }
        }
      }
    }

    this.isColiding = isColliding;
  }
}
