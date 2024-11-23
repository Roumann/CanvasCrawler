export class InputManager {
  private keysPressed: Set<string> = new Set();

  constructor() {
    window.addEventListener("keydown", (e) => this.keysPressed.add(e.key));
    window.addEventListener("keyup", (e) => this.keysPressed.delete(e.key));
  }

  isKeyPressed(key: string): boolean {
    return this.keysPressed.has(key);
  }

  isPressed(): boolean {
    return this.keysPressed.size > 0 ? true : false;
  }
}
