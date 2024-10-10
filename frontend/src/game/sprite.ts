import { Camera } from "./camera";
import { GameObject } from "./game-object";

type SpriteType = {
  imageSrc?: string;
  animations?: Map<string, any>;
  currentAnimation?: string;
  gameObject: GameObject;
  frameRate?: number;
  frameLimit?: number;
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
  scale: number;

  constructor({
    imageSrc,
    animations,
    currentAnimation,
    frameRate,
    gameObject,
    scale,
  }: SpriteType) {
    this.gameObject = gameObject;
    this.image = new Image();
    this.image.src = imageSrc ?? "/items/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // Animation stuff
    this.animations =
      animations ??
      new Map([
        [
          "idle",
          [
            [0, 0],
            [0, 1],
          ],
        ],
      ]);
    this.currentAnimation = currentAnimation ?? "idle";
    this.currentAnimationFrame = 0;
    this.frameRate = frameRate ?? 32;
    this.frameProgress = this.frameRate;
    this.scale = scale ?? 1;
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    if (!this.isLoaded) {
      return;
    }

    // Using 32x32 sprites, so we need to offset the camera by 8 px to center on 16x16 grid
    let cameraX = this.gameObject.position.x - camera.x;
    let cameraY = this.gameObject.position.y - camera.y;

    const [frameX, frameY] = this.frame;

    ctx.imageSmoothingEnabled = false;
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

    this.animate();
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
