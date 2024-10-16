import { level1 } from "../levels/level-1";
import { Camera } from "./camera";
import { GameObject } from "./game-object";
import { Player } from "./player";

export class Game {
  gameObjects: any;
  ctx: CanvasRenderingContext2D;
  world: any;
  camera: Camera;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.gameObjects = [];
    this.world = level1; // todo change to decoupled - save progress to local storage so check storage first if nothing load level 1
    //TODO fix this
    this.camera = new Camera(this.world.gameObjects.player, this.ctx);
  }

  init() {
    // TODO Init controlls and camre here as both are needed only once in the game
    // TODO after changin the leve.ts struture check the type of gameobject and then call new (object type) and save it to gameObjects
    this.gameObjects = Object.values(this.world.gameObjects);
  }

  update() {
    this.gameObjects.forEach((gameObject: GameObject) => {
      gameObject.update();
    });

    this.camera.update();
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.world.map.draw(this.ctx, this.camera, this.world.gameObjects.player);

    this.gameObjects.forEach((gameObject: any) => {
      gameObject.sprite.draw(this.ctx, this.camera);

      // if (gameObject instanceof Player) {
      //   gameObject.weapon.sprite.draw(this.ctx, this.camera); // Draw the player's weapon
      // }
    });
  }

  addChild(gameObject: any) {
    this.gameObjects.push(gameObject);
  }

  removeChild(gameObject: any) {
    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
  }
}
