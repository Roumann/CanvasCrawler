import { Scene } from "./Scene";

export type IWorld = {
  currentScene?: Scene;
  isPaused?: boolean;
  context: CanvasRenderingContext2D | null;
};

export class World {
  scenes: Map<string, Scene>;
  currentScene: Scene | null;

  isPaused: boolean;
  context: CanvasRenderingContext2D | null;

  constructor({ currentScene, isPaused, context }: IWorld) {
    this.context = context ?? null;
    this.isPaused = isPaused ?? false;

    this.scenes = new Map();
    this.currentScene = currentScene ?? null;
  }

  start() {
    // Main gameloop here
    // loop through current scene and run everything systems, updates, renders etc.
  }

  addScene(scene: Scene) {
    this.scenes.set(scene.name, scene);
  }

  pause() {
    this.isPaused = true;
  }

  run() {
    this.isPaused = false;
  }
}

/*
World

- Holds the Canvas context - passed into scene for rendering
- Decides if the game is running or paused

- Holds multiple scenes
- Sets the current scene

- In the future Move game loop here so we can do - world.start()




*/
