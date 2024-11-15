import { Scene } from "./Scene";

export type TWorld = {
  currentScene?: Scene;
  isPaused?: boolean;
};

export class World {
  scenes: Map<string, Scene>;
  currentScene: Scene | null; // Automatically crate base scene if none is passed in
  isPaused: boolean;
  lastTime: number;

  constructor({ currentScene, isPaused }: TWorld) {
    this.scenes = new Map<string, Scene>();
    this.currentScene = currentScene ?? null;

    // TODO add event system here and pass to scenes (i already have the whole scene accesible in systems so i can just do this.scene.eventManager.emit())

    this.isPaused = isPaused ?? false;
    // add time managment here
    // timeElapsed etc.
    this.lastTime = 0;
  }

  start(deltaTime: number) {
    if (this.isPaused) return;

    this.currentScene?.update(deltaTime);
  }

  addScene(scene: Scene) {
    if (this.currentScene === null) {
      this.currentScene = scene;
    }
    this.scenes.set(scene.name, scene);
  }

  setScene(scene: string) {
    // TODO - COMPLETELY CLEAR EVERYTHING FROM THE LAST SCENE

    const newScene = this.scenes.get(scene);
    //maybe throw error if scene doesn't exist
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
