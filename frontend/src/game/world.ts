import { GameObject } from "./game-object";

export class World {
  image: HTMLImageElement;
  isLoaded: boolean = false;

  constructor({ src }: { src: string }) {
    this.image = new Image();
    this.image.src = src ?? "/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }
  draw(ctx: CanvasRenderingContext2D, camera: GameObject) {
    const cameraX = 8 * 16 - camera.position.x;
    const cameraY = 8 * 16 - camera.position.y;

    ctx.drawImage(this.image, Math.floor(cameraX), Math.floor(cameraY));
  }
}
