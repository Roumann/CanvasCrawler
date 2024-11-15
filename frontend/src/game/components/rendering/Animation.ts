export type TAnimationComponent = {
  animations?: Map<string, any> | null;
  currentAnimation?: string;
  spriteGridSize?: { w: number; h: number };
  frameRate?: number;
  animationType?: "loop" | "once" | "bounce";
};

export class AnimationComponent {
  animations: Map<string, any>;
  currentAnimation: string;
  frameRate: number;
  frameProgress: number;
  currentAnimationFrame: number;
  spriteGridSize: { w: number; h: number };
  isCompleted: boolean;
  animationType: "loop" | "once" | "bounce";

  constructor({
    animations,
    currentAnimation,
    spriteGridSize,
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
            [0, 1],
          ],
        ],
      ]);
    this.spriteGridSize = spriteGridSize ?? { w: 32, h: 32 };
    this.currentAnimation = currentAnimation ?? "idle";
    this.currentAnimationFrame = 0;
    this.frameRate = frameRate ?? 32;
    this.frameProgress = this.frameRate;
    this.isCompleted = false;
    this.animationType = animationType ?? "loop";
  }

  get frame() {
    console.log(this.isCompleted);
    if (this.isCompleted) return [0, 0];

    const frame = this.animations.get(this.currentAnimation);
    if (frame === undefined) {
      return [0, 0];
    }

    switch (this.animationType) {
      case "loop":
        if (this.currentAnimationFrame >= frame.length) {
          this.currentAnimationFrame = 0;
        }
        break;
      case "once":
        if (this.currentAnimationFrame >= frame.length) {
          this.isCompleted = true;
        }
        break;
      case "bounce":
        break;
      default:
    }

    return frame[this.currentAnimationFrame];
  }
}
