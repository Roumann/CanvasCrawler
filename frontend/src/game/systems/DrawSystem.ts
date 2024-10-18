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
        if (sprite) {
          if (sprite.isLoaded) {
            if (this.debug) {
              ctx.strokeRect(position.x, position.y, size.w, size.h);
            }

            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
              sprite.image,
              32, // Sprites are 32x32 pixels
              32,
              32, //this selects the whole 32x32 sprite and not just small part
              32,
              position.x,
              position.y,
              size.w,
              size.h
            );
          }
        } else {
          ctx.strokeStyle = "red";
          ctx.strokeRect(position.x, position.y, size.w, size.h);
        }
      }
    });
  }
}
