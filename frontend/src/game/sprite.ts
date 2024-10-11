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

  constructor({
    imageSrc,
    animations,
    currentAnimation,
    frameRate,
    gameObject,
  }: SpriteType) {
    this.gameObject = gameObject;
    this.image = new Image();
    this.image.src = imageSrc ?? "/items/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };

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
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    if (!this.isLoaded) {
      return;
    }

    let cameraX = this.gameObject.position.x - camera.x;
    let cameraY = this.gameObject.position.y - camera.y;

    const [frameX, frameY] = this.frame;

    // Draw box around the sprite
    // ctx.strokeRect(cameraX, cameraY, 16, 16);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.image,
      frameX * 32, // Sprites are 32x32 pixels
      frameY * 32,
      32, //this selects the whole 32x32 sprite and not just small part
      32,
      Math.floor(cameraX - 8), // offset character to make him look centered
      Math.floor(cameraY - 12),
      32, // keeps the pixel size of the sprite and doesnt squish it
      32
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
