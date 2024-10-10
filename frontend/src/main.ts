import { Game } from "./game/game";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Could not get 2d context");
}

const game = new Game(ctx);

game.init();

function gameLoop() {
  if (!ctx) return;

  game.update();
  game.render();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// Initialize the game
// Update the game
// Render the game

//TODO move inputhandler outsite the loop

// debug Grid
// for (let i = 0; i < canvas.width; i++) {
//   for (let j = 0; j < canvas.height; j++) {
//     ctx.strokeRect(i * 32, j * 32, 32, 32);
//   }
// }
