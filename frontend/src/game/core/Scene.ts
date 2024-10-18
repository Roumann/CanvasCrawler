import { EntityManager } from "../managers/EntityManager";
import { SystemManager } from "../managers/SystemManager";

export class Scene {
  entityManager: EntityManager;
  systemManager: SystemManager;
  name: string;

  constructor(name: string) {
    this.name = name;
    this.entityManager = new EntityManager();
    this.systemManager = new SystemManager();
  }
}

/*
Scene

World can hold multiple scenes for exmaple: 
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
