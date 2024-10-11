import { Camera } from "./camera";
import { MapObject } from "../../public/maps/map_3";

export class World {
  image: HTMLImageElement;
  isLoaded: boolean = false;
  walls: any;
  constructor({ src }: { src: string }) {
    this.image = new Image();
    this.image.src = src ?? "/no_src.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.walls = MapObject.layers[1].data;
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

    // for (let eachRow = 0; eachRow < 100; eachRow++) {
    //   for (let eachCol = 0; eachCol < 100; eachCol++) {
    //     let arrayIndex = eachRow * 100 + eachCol;

    //     if (this.walls[arrayIndex] === 0) {
    //       ctx.strokeStyle = "#000";
    //       ctx.strokeRect(
    //         eachCol * 16 - camera.x,
    //         eachRow * 16 - camera.y,
    //         16,
    //         16
    //       );
    //     } else {
    //       ctx.strokeStyle = "#fff";
    //       ctx.strokeRect(
    //         eachCol * 16 - camera.x,
    //         eachRow * 16 - camera.y,
    //         16,
    //         16
    //       );
    //     }
    //   }
    // }
  }
}
