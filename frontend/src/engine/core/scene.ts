import { InputManager } from "./managers/input-manager";
import { EntityManager } from "./managers/entity-manager";
import { SystemManager } from "./managers/system-manager";
import { Camera } from "./camera";
import { Rect } from "../math/rect";
import {
  SceneEnvironment,
  TSceneEnvironment,
} from "../../game/components/SceneEnvironment";

export type TScene = {
  name: string;
  context: CanvasRenderingContext2D;
  bounds: Rect;
  environment?: TSceneEnvironment;
};

export class Scene {
  name: string;

  context: CanvasRenderingContext2D;
  camera: Camera;
  isPaused: boolean;

  entityManager: EntityManager;
  systemManager: SystemManager;
  inputManager: InputManager;

  sceneEnvironment: SceneEnvironment;

  constructor({ name, context, bounds, environment }: TScene) {
    this.name = name;

    this.entityManager = new EntityManager();
    this.systemManager = new SystemManager(this);
    this.inputManager = new InputManager(this); // TODO - this is maybe little too much coupled together??

    this.context = context ?? null;
    this.camera = new Camera({
      bounds,
      context: context,
    });
    this.isPaused = false;
    this.sceneEnvironment = new SceneEnvironment(environment, this);

    // TODO - add event system
  }

  // TODO - here initialize the scene specific stuff - like sprites, animations, etc
  init() {}

  update(deltaTime: number) {
    if (this.isPaused) return;
    this.systemManager.update(deltaTime);

    this.camera.update(this.entityManager);
  }

  // TODO - allow pausing the scene
  pause() {
    // this.systemManager.pause();
  }

  // TODO - clean if scene is destroyed
  cleanUp() {
    // TODO - something like this
    // this.systemManager.cleanUp();
    // this.entityManager.cleanUp();
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
