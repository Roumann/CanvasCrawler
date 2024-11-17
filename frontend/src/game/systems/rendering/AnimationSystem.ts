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

    console.log(entities);

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

// if (animation.animationProgress >= 0) {
//   animation.animationProgress -= 1;
// } else {
//   animation.animationProgress = animation.frameRate;
//   animation.currentFrame += 1;

//   if (animation.currentFrame >= animation.frame.length) {
//     animation.currentFrame = 0;
//     animation.isCompleted = true;
//   }
// }
