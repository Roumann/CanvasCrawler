export class SpriteComponent {
  image: HTMLImageElement;
  isLoaded: boolean = false;

  constructor({ src }: { src?: string }) {
    this.image = new Image();
    this.image.src = src ?? "/items/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }
}
