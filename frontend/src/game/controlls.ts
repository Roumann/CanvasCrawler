export class Controlls {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.left = true;
      }
      if (e.key === "ArrowRight") {
        this.right = true;
      }
      if (e.key === "ArrowUp") {
        this.up = true;
      }
      if (e.key === "ArrowDown") {
        this.down = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") {
        this.left = false;
      }
      if (e.key === "ArrowRight") {
        this.right = false;
      }
      if (e.key === "ArrowUp") {
        this.up = false;
      }
      if (e.key === "ArrowDown") {
        this.down = false;
      }
    });
  }
}
