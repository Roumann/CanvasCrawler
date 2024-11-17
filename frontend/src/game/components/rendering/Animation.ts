export type TAnimationComponent = {
  animations: Map<string, any>;
  currentAnimation: string;
  frameSize: { w: number; h: number };
  frameRate: number;
  animationType: "loop" | "once" | "bounce";
};

export class AnimationComponent {
  animations: Map<string, any>;
  currentAnimation: string;
  currentFrame: number;
  frameSize: { w: number; h: number };
  frameRate: number;
  animationProgress: number;
  isCompleted: boolean;
  // animationType: "loop" | "once" | "bounce";

  constructor({
    animations,
    currentAnimation,
    frameSize,
    frameRate,
    animationType,
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
  }

  get frame() {
    const frame = this.animations.get(this.currentAnimation);
    if (frame === undefined) return [0, 0];
    if (this.currentFrame >= frame.length) {
      this.currentFrame = 0;
      this.isCompleted = true;
    }
    return frame[this.currentFrame];
  }

  // get frame() {
  //   if (this.isCompleted) return [0, 0];

  //   const frame = this.animations.get(this.currentAnimation);
  //   if (frame === undefined) {
  //     return [0, 0];
  //   }

  //   switch (this.animationType) {
  //     case "loop":
  //       if (this.currentAnimationFrame >= frame.length) {
  //         this.currentAnimationFrame = 0;
  //       }
  //       break;
  //     case "once":
  //       if (this.currentAnimationFrame >= frame.length) {
  //         this.isCompleted = true;
  //       }
  //       break;
  //     case "bounce":
  //       break;
  //     default:
  //   }

  //   return frame[this.currentAnimationFrame];
  // }
}
