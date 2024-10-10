import { Player } from "./player";
import { clamp } from "./utils";
import { Vector2 } from "./vector2";

export class Camera {
  player: any;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  playerPos: Vector2;
  worldBounds: any;
  constructor(player: Player, ctx: CanvasRenderingContext2D) {
    this.playerPos = player.position;
    this.x = player.position.x - ctx.canvas.width / 2;
    this.y = player.position.y - ctx.canvas.height / 2;
    this.ctx = ctx;
    this.worldBounds = {
      min: 0,
      max: 3200,
    };
  }

  update() {
    this.x = clamp(
      this.playerPos.x - this.ctx.canvas.width / 2,
      this.worldBounds.min,
      this.worldBounds.max - this.ctx.canvas.width
    );

    this.y = clamp(
      this.playerPos.y - this.ctx.canvas.height / 2,
      this.worldBounds.min,
      this.worldBounds.max - this.ctx.canvas.height
    );
  }
}
