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

    for (const entity of entities) {
      const animation = entity.getComponent(
        "AnimationComponent"
      ) as AnimationComponent;
      if (!animation) continue;

      if (animation.animationProgress >= 0) {
        animation.animationProgress -= 1;
      } else {
        animation.animationProgress = animation.frameRate;
        animation.currentFrame += 1;
      }
    }
  }
}
