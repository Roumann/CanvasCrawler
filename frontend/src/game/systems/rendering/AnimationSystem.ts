import { AnimationComponent } from "../../components/rendering/Animation";
import { System } from "../../core";

export class AnimationSystem extends System {
  constructor() {
    super();
  }
  update(deltaTime: number) {
    const entities = this.scene.entityManager.getEntitiesWithComponents([
      "AnimationComponent",
    ]);
    if (!entities) return;

    entities.forEach((entity) => {
      const animation = entity.getComponent(
        "AnimationComponent"
      ) as AnimationComponent;
      if (!animation) return;

      if (animation.frameProgress > 0) {
        animation.frameProgress -= 1;
        return;
      }
      animation.frameProgress = animation.frameRate;
      animation.currentAnimationFrame += 1;
      if (animation.frame === undefined) {
        animation.currentAnimationFrame = 0;
      }
    });
  }
}
