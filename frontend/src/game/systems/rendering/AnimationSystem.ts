import { PlayerAnimations } from "../../animations/player";
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
      ) as AnimationComponent<PlayerAnimations>;
      if (!animation) continue;

      //
      if (animation.animationProgress >= 0) {
        animation.animationProgress -= 1;
      } else {
        //if user set specific animation and it's completed, reset to previous animation
        if (animation.prevAnimation && animation.isCompleted) {
          animation.currentAnimation = animation.prevAnimation;
          animation.prevAnimation = null;
          // TODO maybe put continue here ???
        }
        // reset animation progress and increment frame
        animation.animationProgress = animation.frameRate;
        animation.currentFrame += 1;
      }
    }
  }
}
