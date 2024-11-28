import { Scene } from "../../engine/core";
import { ColliderComponent } from "./Collider";
import { FixedPositionComponent } from "./FixedPosition";
import { PositionComponent } from "./Position";
import { SpriteComponent } from "./Sprite";
import { TileComponent } from "./Tile";

export type TSceneEnvironment =
  | {
      src?: string;
      size?: { w: number; h: number };
      walls?: any;
    }
  | undefined;

// TODO - rework this i dont like how everything is undefined
// Alsot in rednering system the whole environment block of rendering
export class SceneEnvironment {
  position: PositionComponent | null = null;
  background: SpriteComponent | null = null;
  scene: Scene;

  constructor(environment: TSceneEnvironment, scene: Scene) {
    this.scene = scene;

    if (environment?.src && environment.size) {
      this.position = new PositionComponent({ x: 0, y: 0 });
      this.background = new SpriteComponent({
        src: environment.src,
        size: environment.size,
      });
    }

    if (environment?.walls) {
      this.createWalls(environment.walls);
    }
  }

  createWalls(walls: any) {
    walls.forEach((wall: any) => {
      this.scene.entityManager
        .createEntity()
        .addComponent(new PositionComponent({ x: wall.x, y: wall.y }))
        .addComponent(
          new ColliderComponent({
            w: wall.width,
            h: wall.height,
          })
        )
        .addComponent(new FixedPositionComponent())
        .addComponent(new TileComponent({ type: "wall" }));
    });
  }
}
