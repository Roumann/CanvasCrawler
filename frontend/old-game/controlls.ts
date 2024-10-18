import { Player } from "./player";
import { clamp } from "./utils";

export class Controlls {
  player: Player;
  pressedKeys: Set<string>;
  keyMap: { [key: string]: string };
  walls: any;

  constructor(player: Player) {
    this.player = player;
    this.pressedKeys = new Set();
    this.keyMap = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
      x: "attack",
    };

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (this.keyMap[e.key] && !this.pressedKeys.has(this.keyMap[e.key])) {
        this.pressedKeys.add(this.keyMap[e.key]);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.keyMap[e.key]) {
        this.pressedKeys.delete(this.keyMap[e.key]);
      }
    });
  }

  update() {
    if (this.pressedKeys.size === 0) {
      this.setIdleAnimation();
      return;
    }

    //TODO do i want it like this?????
    this.pressedKeys.forEach((direction) => this.movePlayer(direction));
  }

  movePlayer(direction: string) {
    switch (direction) {
      case "left":
        this.player.direction = "left";
        this.player.sprite.currentAnimation = "walk-left";
        this.player.position.x = clamp(
          this.player.position.x - this.player.speed,
          0,
          1600 - this.player.size.x
        );
        break;
      case "right":
        this.player.direction = "right";
        this.player.sprite.currentAnimation = "walk-right";
        this.player.position.x = clamp(
          this.player.position.x + this.player.speed,
          0,
          1600 - this.player.size.x
        );
        break;
      case "up":
        this.player.sprite.currentAnimation =
          this.player.direction === "left" ? "walk-up-l" : "walk-up-r";
        this.player.position.y = clamp(
          this.player.position.y - this.player.speed,
          0,
          1600 - this.player.size.y
        );
        break;
      case "down":
        this.player.sprite.currentAnimation =
          this.player.direction === "left" ? "walk-down-l" : "walk-down-r";
        this.player.position.y = clamp(
          this.player.position.y + this.player.speed,
          0,
          1600 - this.player.size.y
        );
        break;
    }
  }

  setIdleAnimation() {
    const idleDir = this.player.direction === "left" ? "left" : "right";
    this.player.sprite.currentAnimation = `idle-${idleDir}`;
  }
}
