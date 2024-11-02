import { EntityManager } from "../managers/EntityManager";
import { SystemManager } from "../managers/SystemManager";

export type TScene = {
  name: string;
  context: CanvasRenderingContext2D | null;
};

export class Scene {
  context: CanvasRenderingContext2D | null;
  entityManager: EntityManager;
  systemManager: SystemManager;
  name: string;

  // TODO Add more information about the scene/game like mouse position, etc

  constructor({ name, context }: TScene) {
    this.name = name;
    this.context = context ?? null;

    this.entityManager = new EntityManager();
    this.systemManager = new SystemManager(this.entityManager);
  }

  update(deltaTime: number) {
    this.systemManager.update(deltaTime);
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
