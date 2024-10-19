import { clamp } from "../utils/clamp";
import { Entity } from "./Entity";

export type ICamera = {
  x: number;
  y: number;
  width: number;
  height: number;
  context: CanvasRenderingContext2D | null;
  follow: Entity;
};

export class Camera {
  x: number;
  y: number;
  width: number;
  height: number;

  worldBounds: any;
  context: CanvasRenderingContext2D | null;
  followEntity: Entity;

  constructor({ x, y, width, height, context, follow }: ICamera) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context ?? null;
    this.worldBounds = {
      min: 0,
      max: 3200,
    };
    this.followEntity = follow;
  }

  update() {
    const position = this.followEntity.getComponent("PositionComponent");
    if (!position || !this.context) return;

    this.x = clamp(
      position.x - this.context.canvas.width / 2,
      this.worldBounds.min,
      this.worldBounds.max - this.context.canvas.width
    );

    this.y = clamp(
      position.y - this.context.canvas.height / 2,
      this.worldBounds.min,
      this.worldBounds.max - this.context.canvas.height
    );

    // this.x = position.x;
    // this.y = position.y;
  }

  get postion() {
    return { x: this.x, y: this.y };
  }

  setFollow(entity: Entity) {
    this.followEntity = entity;
  }
}
