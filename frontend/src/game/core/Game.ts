import { Camera } from "./Camera";
import { Scene } from "./Scene";

export type TWorld = {
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
  currentScene: Scene | null; // Automatically crate base scene if none is passed in
  camera: Camera | null;

  isPaused: boolean;
  lastTime: number;

  constructor({ currentScene, width, height, isPaused, context }: TWorld) {
    this.context = context ?? null;
    this.width = width;
    this.height = height;

    this.camera = null;
    this.scenes = new Map<string, Scene>();
    this.currentScene = currentScene ?? null;

    this.isPaused = isPaused ?? false;
    // add time managment here
    // timeElapsed etc.
    this.lastTime = 0;
  }

  start(deltaTime: number) {
    if (this.isPaused || !this.context) return;

    this.currentScene?.update(deltaTime);

    this.camera?.update();
  }

  addScene(scene: Scene) {
    if (this.currentScene === null) {
      this.currentScene = scene;
    }
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
