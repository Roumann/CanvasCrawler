import { System } from "../../../engine/core";
import {
  ColliderComponent,
  PositionComponent,
  SpriteComponent,
  SpriteOffsetComponent,
} from "../../components";
import { AnimationComponent } from "../../components/Animation";

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

  update() {
    const ctx = this.scene.context;

    const entities = this.scene.entityManager.getEntitiesWithComponents([
      "PositionComponent",
      "ColliderComponent",
      "SpriteComponent",
    ]);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const sceneEnvironment = this.scene.sceneEnvironment;
    if (sceneEnvironment && sceneEnvironment.background) {
      const position = sceneEnvironment.position;
      if (!position) return;

      const cameraX = position.pos.x - this.scene.camera.pos.x;
      const cameraY = position.pos.y - this.scene.camera.pos.y;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        sceneEnvironment.background.image,
        0,
        0,
        sceneEnvironment.background.size.w,
        sceneEnvironment.background.size.h,
        cameraX,
        cameraY,
        sceneEnvironment.background.size.w,
        sceneEnvironment.background.size.h
      );
    }

    entities.forEach((entity) => {
      const position =
        entity.getComponent<PositionComponent>("PositionComponent");
      if (!position) return;

      const cameraX = position.pos.x - this.scene.camera.pos.x;
      const cameraY = position.pos.y - this.scene.camera.pos.y;

      let offset = {
        x: 0,
        y: 0,
      };

      const sprite = entity.getComponent<SpriteComponent>("SpriteComponent");
      const spriteOffset = entity.getComponent<SpriteOffsetComponent>(
        "SpriteOffsetComponent"
      );

      if (spriteOffset) {
        offset.x = spriteOffset.x;
        offset.y = spriteOffset.y;
      }

      if (sprite && sprite.isLoaded) {
        const animation =
          entity.getComponent<AnimationComponent<any>>("AnimationComponent");

        let [frameX, frameY] = [0, 0];
        let frameSize = { w: 0, h: 0 };

        if (animation) {
          [frameX, frameY] = animation.frame;
          frameSize = animation.frameSize;
        }

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          sprite.image,
          frameX * frameSize.w + offset.x, // Animation frame selection goes here
          frameY * frameSize.h + offset.y,
          sprite.size.w,
          sprite.size.h,
          Math.floor(cameraX),
          Math.floor(cameraY),
          sprite.size.w,
          sprite.size.h
        );
      }

      if (this.debug) {
        const collider =
          entity.getComponent<ColliderComponent>("ColliderComponent");

        if (collider) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = "red";
          ctx.strokeRect(cameraX, cameraY, collider.w, collider.h);
          ctx.fillText(entity.id.toString(), cameraX, cameraY - 2);
        }
      }
    });
  }
}
