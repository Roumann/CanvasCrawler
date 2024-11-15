import {
  ColliderComponent,
  FixedPositionComponent,
  PositionComponent,
  TileComponent,
} from "../components";
import { SceneBackground } from "../components/gameplay/SceneBackground";
import { EntityManager } from "../managers/EntityManager";
import { SystemManager } from "../managers/SystemManager";
import { Camera } from "./Camera";

export type TScene = {
  name: string;
  context: CanvasRenderingContext2D | null;
  camera: {
    bounds: { min: number; max: number };
  };
  background?: {
    src: string;
    size: { w: number; h: number };
  };
  walls?: any;
};

export class Scene {
  name: string;
  context: CanvasRenderingContext2D | null;
  camera: Camera;
  background?: SceneBackground | null;
  walls?: any | null;
  entityManager: EntityManager;
  systemManager: SystemManager;

  constructor({ name, context, camera, background, walls }: TScene) {
    this.name = name;
    this.context = context ?? null;
    this.entityManager = new EntityManager();
    this.systemManager = new SystemManager(this);
    this.camera = new Camera({
      camera,
      context: context,
    });
    this.background = background ? new SceneBackground({ background }) : null;
    this.walls = walls ? this.createWalls(walls) : null;
  }

  update(deltaTime: number) {
    this.systemManager.update(deltaTime);

    // TODO maybe move this
    this.camera.update(this.entityManager);
  }

  addCamera(camera: Camera) {
    this.camera = camera;
  }

  createWalls(walls: any) {
    walls.forEach((wall: any) => {
      this.entityManager
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

/*
Scene

World can hold multiple scenes for example: 
 - Menu
 - Settings
 - Overworld
 - Dungeon


 Or one world can be split into multiple scenes
  - Split map to 2x2 grid
  - Scene 1 = top left grid
  - Scene 2 = top right grid
  - Scene 3 = bottom left grid
  - Scene 4 = bottom right grid

  when player moves to the edge change scene

  Each scene has its own systems and entities example: 
   - Overworld
    - normal gravity system
    - 2 enemies entities
    - normal hero sprite

   - Space 
    - low gravity system
    - 10 enemies entities
    - space suite sprite
  
  



*/
