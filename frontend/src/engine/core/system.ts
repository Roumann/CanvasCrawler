import { Scene } from "./scene";

// TODO - refractor this
// need the scene to be avaible without Null checks everywhere but also not require the user to pass it in every system initialization
export abstract class System {
  private _scene: Scene | null = null;

  protected get scene(): Scene {
    if (!this._scene) {
      throw new Error(
        "Scene not set. Make sure to call setScene before using the system."
      );
    }
    return this._scene;
  }

  setScene(scene: Scene) {
    this._scene = scene;
  }

  abstract update(...args: any[]): void;

  /**
   * Called after update functions in all systems have been called.
   * This is where you should do any cleanup.
   */
  cleanUp() {}
}
