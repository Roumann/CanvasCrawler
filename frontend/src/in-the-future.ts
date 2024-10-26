import { HealthComponent } from "./game/components/Health";
import { PositionComponent } from "./game/components/Position";
import { SizeComponent } from "./game/components/Size";
import { SpriteComponent } from "./game/components/Sprite";
import { VelocityComponent } from "./game/components/Velocity";
import { Camera } from "./game/core/Camera";
import { Game } from "./game/core/Game";
import { Scene } from "./game/core/Scene";

import { WallCollisionSystem } from "./game/systems/WallCollision";
import { MovementSystem } from "./game/systems/Movement";
import { RenderSystem } from "./game/systems/RenderSystem";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// world or maybe Scene??  will hold Canvas context TODO research
const game = new Game({
  // change this to viewport
  width: 256,
  height: 256,
  // Add map bounds - 3200x3200px
  isPaused: false,
  context: ctx,
});

const overworld = new Scene({
  name: "overworld",
});

// System should have access to entity manager
// Its an array, order of systems matters
overworld.systemManager.addSystem(new MovementSystem(ctx));
overworld.systemManager.addSystems([
  new WallCollisionSystem(),
  new RenderSystem(),
]);

const player = overworld.entityManager.createEntity();
player
  .addComponent(new PositionComponent({ x: 10, y: 10 }))
  .addComponent(new SizeComponent({ w: 32, h: 32 }))
  .addComponent(new VelocityComponent({ vx: 120, vy: 120 }))
  .addComponent(new HealthComponent({ health: 100, maxHealth: 100 }))
  .addComponent(new SpriteComponent({ src: "/characters/char_4.png" }));

game.addScene(overworld);

const camera = new Camera({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  context: ctx,
  follow: player,
});
game.addCamera(camera);

game.start();

// game.pause(); Pause game - Settings / Level up screen etc.

/* -------------------------------------------------------------------------------------- */
