import {
  ColliderComponent,
  PositionComponent,
  SpriteComponent,
  SpriteOffsetComponent,
} from "../../components";
import { AnimationComponent } from "../../components/rendering/Animation";
import { Camera, System } from "../../core";

type TRenderSystem = {
  ctx: CanvasRenderingContext2D | null;
  camera: Camera;
  debug?: boolean;
};

export class RenderSystem extends System {
  ctx: CanvasRenderingContext2D | null;
  camera: Camera;
  debug: boolean;

  constructor({ ctx, camera, debug = false }: TRenderSystem) {
    super();
    this.ctx = ctx;
    this.camera = camera;
    this.debug = debug;
  }

  update(deltaTime: number) {
    if (!this.entityManager || !this.ctx || !this.camera) return;

    const entities = this.entityManager.getEntitiesWithComponents([
      "PositionComponent",
      "ColliderComponent",
      "SpriteComponent",
      "SpriteOffsetComponent",
    ]);

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    entities.forEach((entity) => {
      const position = entity.getComponent(
        "PositionComponent"
      ) as PositionComponent;

      const cameraX = position.x - this.camera.x;
      const cameraY = position.y - this.camera.y;

      let offset = {
        x: 0,
        y: 0,
      };

      if (position) {
        const sprite = entity.getComponent(
          "SpriteComponent"
        ) as SpriteComponent;
        const spriteOffset = entity.getComponent(
          "SpriteOffsetComponent"
        ) as SpriteOffsetComponent;

        if (spriteOffset) {
          offset.x = spriteOffset.x;
          offset.y = spriteOffset.y;
        }

        if (sprite && sprite.isLoaded && this.ctx) {
          const animation = entity.getComponent(
            "AnimationComponent"
          ) as AnimationComponent;

          let [frameX, frameY] = [0, 0];
          let spriteGridSize = { w: 0, h: 0 };

          if (animation) {
            [frameX, frameY] = animation.frame;
            spriteGridSize = animation.spriteGridSize;
          }

          if (this.debug) {
            this.ctx.strokeRect(cameraX, cameraY, sprite.size.w, sprite.size.h);
          }

          this.ctx.imageSmoothingEnabled = false;
          this.ctx.drawImage(
            sprite.image,
            frameX * spriteGridSize.w + offset.x, // Animation frame selection goes here
            frameY * spriteGridSize.h + offset.y,
            sprite.size.w,
            sprite.size.h,
            cameraX,
            cameraY,
            sprite.size.w,
            sprite.size.h
          );

          if (animation) {
            animation.animate();
          }
        }
        // If no sprite, render a basic rectangle (e.g., for walls)
        else {
          const size = entity.getComponent(
            "ColliderComponent"
          ) as ColliderComponent;

          if (!size || !this.ctx) return;

          if (this.debug) {
            this.ctx.fillStyle = this.debug ? "rgba(255, 0, 0, 0.5)" : "gray"; // Red if debug, otherwise gray
            this.ctx.fillRect(cameraX, cameraY, size.w, size.h);
            this.ctx.strokeRect(cameraX, cameraY, size.w, size.h);
          }
        }
      }
    });
  }
}
