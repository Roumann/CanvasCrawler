export type TSpriteComponent = {
  src?: string;
  size?: { w: number; h: number };
};

export class SpriteComponent {
  image: HTMLImageElement;
  isLoaded: boolean = false;
  size: { w: number; h: number };

  constructor({ src, size }: TSpriteComponent) {
    this.image = new Image();
    this.image.src = src ?? "/items/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.size = size ?? { w: 32, h: 32 };
  }
}
