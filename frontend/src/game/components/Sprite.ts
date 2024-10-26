export type TSpriteComponent = {
  src?: string;
};

export class SpriteComponent {
  image: HTMLImageElement;
  isLoaded: boolean = false;

  constructor({ src }: TSpriteComponent) {
    this.image = new Image();
    this.image.src = src ?? "/items/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }
}
