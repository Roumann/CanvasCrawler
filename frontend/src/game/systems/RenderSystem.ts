import { Camera } from "../core/Camera";
import { Entity } from "../core/Entity";
import { System } from "../core/System";

export class RenderSystem extends System {
  debug: boolean;

  constructor(debug = false) {
    super();
    this.debug = debug;
  }

  update(entities: Entity[], ctx: CanvasRenderingContext2D, camera: Camera) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    entities.forEach((entity) => {
      const position = entity.getComponent("PositionComponent");
      const size = entity.getComponent("SizeComponent");

      const cameraX = position.x - camera.x;
      const cameraY = position.y - camera.y;

      let offset = {
        x: 0,
        y: 0,
      };

      if (position && size) {
        const sprite = entity.getComponent("SpriteComponent");
        const spriteOffset = entity.getComponent("SpriteOffsetComponent");

        if (spriteOffset) {
          offset.x = spriteOffset.x;
          offset.y = spriteOffset.y;
        }

        if (sprite && sprite.isLoaded) {
          if (this.debug) {
            ctx.strokeRect(cameraX, cameraY, size.w, size.h);
          }

          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(
            sprite.image,
            0 + offset.x, // Animation frame selection goes here
            0 + offset.y,
            size.w,
            size.h,
            cameraX,
            cameraY,
            size.w,
            size.h
          );
        }
        // If no sprite, render a basic rectangle (e.g., for walls)
        else {
          if (this.debug) {
            ctx.fillStyle = this.debug ? "rgba(255, 0, 0, 0.5)" : "gray"; // Red if debug, otherwise gray
            ctx.fillRect(cameraX, cameraY, size.w, size.h);
            ctx.strokeRect(cameraX, cameraY, size.w, size.h);
          }
        }
      }
    });
  }
}
