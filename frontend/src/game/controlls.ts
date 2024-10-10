import { Player } from "./player";
import { clamp } from "./utils";

export class Controlls {
  player: Player;
  pressedKeys: string[];
  keyMap: any;

  constructor(player: Player) {
    this.player = player;
    this.pressedKeys = [];
    this.keyMap = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
    };

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (this.pressedKeys.includes(this.keyMap[e.key])) {
        return;
      }
      this.pressedKeys.push(this.keyMap[e.key]);
    });

    window.addEventListener("keyup", (e) => {
      this.pressedKeys = this.pressedKeys.filter(
        (key) => key !== this.keyMap[e.key]
      );
    });
  }

  //TODO fix this
  update() {
    const movingDirection = this.pressedKeys[0];

    if (movingDirection) {
      if (movingDirection === "left") {
        this.player.direction = "left";
        this.player.sprite.currentAnimation = "walk-left";
        this.player.position.x = clamp(
          this.player.position.x - this.player.speed,
          0,
          1600 - this.player.size.x
        );
      }
      if (movingDirection === "right") {
        this.player.direction = "right";
        this.player.sprite.currentAnimation = "walk-right";
        this.player.position.x = clamp(
          this.player.position.x + this.player.speed,
          0,
          1600 - this.player.size.x
        );
      }
      if (movingDirection === "up") {
        if (this.player.direction === "left") {
          this.player.sprite.currentAnimation = "walk-up-l";
        } else if (this.player.direction === "right") {
          this.player.sprite.currentAnimation = "walk-up-r";
        }
        this.player.position.y = clamp(
          this.player.position.y - this.player.speed,
          0,
          1600 - this.player.size.y
        );
      }
      if (movingDirection === "down") {
        if (this.player.direction === "left") {
          this.player.sprite.currentAnimation = "walk-down-l";
        } else if (this.player.direction === "right") {
          this.player.sprite.currentAnimation = "walk-down-r";
        }
        this.player.position.y = clamp(
          this.player.position.y + this.player.speed,
          0,
          1600 - this.player.size.y
        );
      }
    } else {
      if (this.player.direction === "left") {
        this.player.sprite.currentAnimation = "idle-left";
      } else if (this.player.direction === "right") {
        this.player.sprite.currentAnimation = "idle-right";
      }
    }
  }
}
