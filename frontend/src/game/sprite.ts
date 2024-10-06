import { GameObject } from "./game-object";

type SpriteType = {
  imageSrc?: string;
  animations?: Map<string, any>;
  currentAnimation?: string;
  gameObject: GameObject;
  frameRate?: number;
  frameLimit?: number;
  isStatic?: boolean;
  scale?: number;
};

export class Sprite {
  image: HTMLImageElement;
  isLoaded: boolean = false;
  animations: Map<string, any>;
  currentAnimation: string;
  gameObject: GameObject;
  frameRate: number;
  frameProgress: number;
  currentAnimationFrame: number;
  isStatic: boolean;
  scale: number;

  constructor({
    imageSrc,
    animations,
    currentAnimation,
    frameRate,
    gameObject,
    isStatic,
    scale,
  }: SpriteType) {
    this.gameObject = gameObject;
    this.image = new Image();
    this.image.src = imageSrc ?? "/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // Animations
    this.animations = animations ?? new Map([["default", [[0, 0]]]]);
    this.currentAnimation = currentAnimation ?? "default";
    this.currentAnimationFrame = 0;
    this.frameRate = frameRate ?? 32;
    this.frameProgress = this.frameRate;
    this.isStatic = isStatic ?? false;
    this.scale = scale ?? 1;
  }

  draw(ctx: CanvasRenderingContext2D, camera: GameObject) {
    if (!this.isLoaded) {
      return;
    }

    // TODO move the camer to make 32x32 assets work centered maybe resihze the map
    const cameraX = this.gameObject.position.x - 8 + 8 * 16 - camera.position.x;
    const cameraY = this.gameObject.position.y - 8 + 8 * 16 - camera.position.y;

    const [frameX, frameY] = this.frame;

    ctx.drawImage(
      this.image,
      frameX * this.gameObject.size.x,
      frameY * this.gameObject.size.y,
      this.gameObject.size.x,
      this.gameObject.size.x,
      Math.floor(cameraX),
      Math.floor(cameraY),
      this.gameObject.size.x * this.scale,
      this.gameObject.size.y * this.scale
    );

    if (!this.isStatic) {
      this.animate();
    }
  }

  animate() {
    if (this.frameProgress > 0) {
      this.frameProgress -= 1;
      return;
    }

    this.frameProgress = this.frameRate;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  get frame() {
    const frame = this.animations.get(this.currentAnimation);
    if (frame === undefined) {
      return [0, 0];
    }

    if (this.currentAnimationFrame >= frame.length) {
      this.currentAnimationFrame = 0;
    }

    return frame[this.currentAnimationFrame];
  }
}
