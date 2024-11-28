import { Scene } from "./scene";

export type TEngine = {
  currentScene?: Scene;
};

export class Engine {
  scenes: Map<string, Scene>;
  currentScene: Scene | null;
  lastTime: number;

  constructor() {
    this.scenes = new Map<string, Scene>();
    this.currentScene = null;

    // TODO add time managment here
    this.lastTime = 0;
  }

  start(deltaTime: number) {
    if (!this.currentScene) return;

    this.currentScene.update(deltaTime);
  }

  addScene(scene: Scene) {
    if (this.currentScene === null) {
      this.currentScene = scene;
    }
    this.scenes.set(scene.name, scene);
  }

  setScene(scene: string) {
    // TODO - research if i should completely clear the last scene when switching
    const nextScene = this.scenes.get(scene);
    if (!nextScene) {
      console.error(`Scene ${scene} doesn't exist`);
      return;
    }
    this.currentScene = nextScene;
  }
}

/*
Engine

- Holds the Canvas context - passed into scene for rendering
- Decides if the game is running or paused

- Holds multiple scenes
- Sets the current scene

- In the future Move game loop here so we can do - Engine.start()

*/
