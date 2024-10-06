import { Sprite } from "./sprite";
import { Vector2 } from "./vector2";

type GameObjectType = {
  position: Vector2;
  size: Vector2;
  src?: string;
  scale?: number;
  animationMap?: Map<string, any>;
  currentAnimation?: string;
  frameRate?: number;
  isStatic?: boolean;
};

export class GameObject {
  position: Vector2;
  size: Vector2;
  sprite: Sprite;
  src: string | null = null;
  currentAnimation: string;

  constructor({
    position,
    size,
    scale,
    src,
    animationMap,
    currentAnimation,
    frameRate,
    isStatic,
  }: GameObjectType) {
    this.position = position;
    this.size = size;
    this.currentAnimation = currentAnimation ?? "default";
    this.sprite = new Sprite({
      imageSrc: src,
      scale: scale,
      gameObject: this,
      animations: animationMap,
      currentAnimation: currentAnimation,
      frameRate: frameRate,
      isStatic: isStatic,
    });
  }

  update() {}
}
