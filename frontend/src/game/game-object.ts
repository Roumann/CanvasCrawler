import { Sprite } from "./sprite";
import { Vector2 } from "./vector2";

type GameObjectType = {
  position: Vector2;
  size: Vector2;
  src?: string;
  animationMap?: Map<string, any>;
  currentAnimation?: string;
  frameRate?: number;
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

    src,
    animationMap,
    currentAnimation,
    frameRate,
  }: GameObjectType) {
    this.position = position;
    this.size = size;
    this.currentAnimation = currentAnimation ?? "default";
    this.sprite = new Sprite({
      imageSrc: src,
      gameObject: this,
      animations: animationMap,
      currentAnimation: currentAnimation,
      frameRate: frameRate,
    });
  }

  update() {}
}
