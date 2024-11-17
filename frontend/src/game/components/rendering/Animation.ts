export type TAnimationComponent = {
  animations: Map<string, any>;
  currentAnimation: string;
  frameSize: { w: number; h: number };
  frameRate: number;
  loop: boolean;
};

export class AnimationComponent {
  animations: Map<string, any>;
  currentAnimation: string;
  currentFrame: number;
  frameSize: { w: number; h: number };
  frameRate: number;
  animationProgress: number;
  isCompleted: boolean;
  loop: boolean;

  constructor({
    animations,
    currentAnimation,
    frameSize,
    frameRate,
    loop,
  }: TAnimationComponent) {
    this.animations =
      animations ??
      new Map([
        [
          "idle",
          [
            [0, 0],
            [1, 0],
          ],
        ],
      ]);
    this.currentAnimation = currentAnimation; // "idle"
    this.currentFrame = 0;
    this.frameSize = frameSize; // { w: 32, h: 32 }
    this.frameRate = frameRate; // 32
    this.animationProgress = this.frameRate; // this is like a buffer that counts down to 0 so every X[FrameRate] frames sprite will change
    this.isCompleted = false;
    this.loop = loop;
  }

  get frame() {
    const frame = this.animations.get(this.currentAnimation);
    if (frame === undefined) return [0, 0];
    if (this.currentFrame >= frame.length) {
      this.currentFrame = 0;
      this.isCompleted = true;
    }

    if (!this.loop && this.isCompleted) {
      return frame[frame.length - 1];
    }

    return frame[this.currentFrame];
  }
}
