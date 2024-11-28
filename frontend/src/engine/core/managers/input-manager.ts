import { Scene } from "../scene";

export class InputManager {
  private keysPressed: Set<string> = new Set();

  constructor(scene: Scene) {
    window.addEventListener("keydown", (e) => {
      // TODO - not a big fan of this, but it's ok for now
      if (e.code === "Escape") {
        scene.isPaused = !scene.isPaused;
      }
      this.keysPressed.add(e.key);
    });
    window.addEventListener("keyup", (e) => this.keysPressed.delete(e.key));
  }

  isKeyPressed(key: string): boolean {
    return this.keysPressed.has(key);
  }

  isPressed(): boolean {
    return this.keysPressed.size > 0 ? true : false;
  }
}
