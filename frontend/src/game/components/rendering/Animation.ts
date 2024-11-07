export type TAnimationComponent = {
  animations?: Map<string, any>;
  currentAnimation?: string;
  spriteGridSize?: { w: number; h: number };
  frameRate?: number;
};

export class AnimationComponent {
  animations: Map<string, any>;
  currentAnimation: string;
  frameRate: number;
  frameProgress: number;
  currentAnimationFrame: number;
  spriteGridSize: { w: number; h: number };

  constructor({
    animations,
    currentAnimation,
    spriteGridSize,
    frameRate,
  }: TAnimationComponent) {
    this.animations =
      animations ??
      new Map([
        [
          "idle",
          [
            [0, 0],
            [0, 1],
            [0, 2],
          ],
        ],
      ]);
    this.spriteGridSize = spriteGridSize ?? { w: 32, h: 32 };
    this.currentAnimation = currentAnimation ?? "idle";
    this.currentAnimationFrame = 0;
    this.frameRate = frameRate ?? 32;
    this.frameProgress = this.frameRate;
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
}
