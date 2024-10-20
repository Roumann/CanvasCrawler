import { Camera } from "./Camera";
import { Scene } from "./Scene";

export type IWorld = {
  width: number;
  height: number;
  context: CanvasRenderingContext2D | null;

  currentScene?: Scene;
  isPaused?: boolean;
};

export class Game {
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;

  scenes: Map<string, Scene>;
  currentScene: Scene | null;
  camera: Camera | null;

  isPaused: boolean;

  constructor({ currentScene, width, height, isPaused, context }: IWorld) {
    this.context = context ?? null;
    this.width = width;
    this.height = height;

    this.camera = null;
    this.scenes = new Map<string, Scene>();
    this.currentScene = currentScene ?? null;

    this.isPaused = isPaused ?? false;
    // add time managment here
    // timeElapsed etc.
  }

  start() {
    // Main gameloop here
    // loop through current scene and run everything systems, updates, renders etc.

    this.currentScene?.update();

    this.currentScene?.render();
  }

  addScene(scene: Scene) {
    this.scenes.set(scene.name, scene);
  }

  addCamera(camera: Camera) {
    this.camera = camera;
  }

  setScene(scene: string) {
    const newScene = this.scenes.get(scene);
    //maybe throw error if scene doesnt exist
    if (!newScene) return;
    this.currentScene = newScene;
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
