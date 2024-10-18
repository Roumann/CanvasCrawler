import { Entity } from "../core/Entity";

export class DrawSystem {
  debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
  }

  render(entities: Entity[], ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    entities.forEach((entity) => {
      const position = entity.getComponent("PositionComponent");
      const size = entity.getComponent("SizeComponent");

      if (position && size) {
        const sprite = entity.getComponent("SpriteComponent");

        if (sprite && sprite.isLoaded) {
          if (this.debug) {
            ctx.strokeRect(position.x, position.y, size.w, size.h);
          }

          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(
            sprite.image,
            0, // Animation frame selection goes here
            0,
            size.w,
            size.h,
            position.x,
            position.y,
            size.w,
            size.h
          );
        }
        // If no sprite, render a basic rectangle (e.g., for walls)
        else {
          ctx.fillStyle = this.debug ? "rgba(255, 0, 0, 0.5)" : "gray"; // Red if debug, otherwise gray
          ctx.fillRect(position.x, position.y, size.w, size.h);

          if (this.debug) {
            ctx.strokeRect(position.x, position.y, size.w, size.h);
          }
        }
      }
    });
  }
}
