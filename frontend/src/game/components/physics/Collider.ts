export type TColliderComponent = {
  w: number;
  h: number;
};

export class ColliderComponent {
  w: number;
  h: number;

  constructor({ w = 32, h = 32 }: TColliderComponent) {
    this.w = w;
    this.h = h;
  }

  get size() {
    return { w: this.w, h: this.h };
  }
}
