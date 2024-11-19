export type TAnimationComponent<T extends string> = {
  animations: Map<T, number[][]>;
  currentAnimation: T;
  frameSize: { w: number; h: number };
  frameRate: number;
  loop: boolean;
};

export class AnimationComponent<T extends string> {
  animations: Map<T, number[][]>;
  currentAnimation: T;
  currentFrame: number;
  frameSize: { w: number; h: number };
  frameRate: number;
  animationProgress: number;
  isCompleted: boolean;
  loop: boolean;
  prevAnimation: T | null;

  constructor({
    animations,
    currentAnimation,
    frameSize,
    frameRate,
    loop,
  }: TAnimationComponent<T>) {
    this.animations =
      animations ??
      new Map([
        [
          "idle" as T,
          [
            [0, 0],
            [1, 0],
          ],
        ] as [T, number[][]],
      ]);
    this.currentAnimation = currentAnimation; // "idle"
    this.currentFrame = 0;
    this.frameSize = frameSize; // { w: 32, h: 32 }
    this.frameRate = frameRate; // 32
    this.animationProgress = this.frameRate; // this is like a buffer that counts down to 0 so every X[FrameRate] frames sprite will change
    this.isCompleted = false;
    this.loop = loop;
    this.prevAnimation = null;
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

  // this is used to play specific animations for ex. when player is hit
  // this selects the new frame and resets the animation state
  set Frame(frame: T) {
    if (this.prevAnimation === this.currentAnimation) return;
    if (!this.animations.has(frame)) {
      console.warn(`Animation ${frame} not found in provided animation map!`);
      return;
    }
    this.prevAnimation = this.currentAnimation;
    this.currentFrame = 0;
    this.isCompleted = false;
    this.currentAnimation = frame;
  }
}
