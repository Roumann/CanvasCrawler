import { level1 } from "../levels/level-1";

export class Game {
  gameObjects: any;
  ctx: CanvasRenderingContext2D;
  world: any;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.gameObjects = [];
    this.world = level1; // todo change to decoupled
  }

  init() {
    this.gameObjects = Object.values(this.world.gameObjects);
  }

  update() {
    this.gameObjects.forEach((gameObject: any) => {
      gameObject.update();
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    const camera = this.world.gameObjects.player;

    this.world.map.draw(this.ctx, camera);

    this.gameObjects.forEach((gameObject: any) => {
      gameObject.sprite.draw(this.ctx, camera);
    });
  }

  addChild(gameObject: any) {
    this.gameObjects.push(gameObject);
  }
}
