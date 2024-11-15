import {
  ColliderComponent,
  PositionComponent,
  SpriteComponent,
  SpriteOffsetComponent,
} from "../../components";
import { AnimationComponent } from "../../components/rendering/Animation";
import { System } from "../../core";

type TRenderSystem = {
  debug?: boolean;
};
// TODO - add rendering order system
export class RenderSystem extends System {
  debug: boolean;

  constructor({ debug = false }: TRenderSystem) {
    super();
    this.debug = debug;
  }

  update(deltaTime: number) {
    if (!this.scene || !this.scene.context) return;
    const ctx = this.scene.context;

    const entities = this.scene.entityManager.getEntitiesWithComponents([
      "PositionComponent",
      "ColliderComponent",
      "SpriteComponent",
      "SpriteOffsetComponent",
    ]);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const sceneBackground = this.scene.background;
    if (sceneBackground) {
      const position = sceneBackground.position;

      const cameraX = position.x - this.scene.camera.pos.x;
      const cameraY = position.y - this.scene.camera.pos.y;

      ctx.drawImage(
        sceneBackground.background.image,
        0,
        0,
        sceneBackground.background.size.w,
        sceneBackground.background.size.h,
        cameraX,
        cameraY,
        sceneBackground.background.size.w,
        sceneBackground.background.size.h
      );
    }

    entities.forEach((entity) => {
      const position = entity.getComponent(
        "PositionComponent"
      ) as PositionComponent;

      const cameraX = position.x - this.scene.camera.pos.x;
      const cameraY = position.y - this.scene.camera.pos.y;

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

        if (sprite && sprite.isLoaded) {
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
            ctx.lineWidth = 0.5;
            ctx.strokeRect(cameraX, cameraY, sprite.size.w, sprite.size.h);

            ctx.fillText(entity.id.toString(), cameraX, cameraY);

            const collider = entity.getComponent(
              "ColliderComponent"
            ) as ColliderComponent;
            if (collider) {
              ctx.strokeStyle = "yellow";
              ctx.strokeRect(cameraX, cameraY, collider.w, collider.h);
              ctx.strokeStyle = "black";
            }
          }

          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(
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
        }
        // If no sprite, render a basic rectangle (e.g., for walls)
        else {
          const size = entity.getComponent(
            "ColliderComponent"
          ) as ColliderComponent;

          if (!size || !ctx) return;

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
