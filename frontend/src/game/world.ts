import { Camera } from "./camera";

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
  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    let sX = camera.x;
    let sY = camera.y;
    const maxX = this.image.width - ctx.canvas.width;
    const maxY = this.image.height - ctx.canvas.height;

    sX = Math.max(0, Math.min(sX, maxX));
    sY = Math.max(0, Math.min(sY, maxY));
    let sW = ctx.canvas.width;
    let sH = ctx.canvas.height;

    let dx = 0;
    let dy = 0;
    let dW = sW;
    let dH = sH;

    ctx.drawImage(
      this.image,
      Math.floor(sX),
      Math.floor(sY),
      sW,
      sH,
      Math.floor(dx),
      Math.floor(dy),
      dW,
      dH
    );
  }
}
