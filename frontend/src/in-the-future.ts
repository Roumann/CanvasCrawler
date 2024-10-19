import { HealthComponent } from "./game/components/Health";
import { PositionComponent } from "./game/components/Position";
import { SizeComponent } from "./game/components/Size";
import { SpriteComponent } from "./game/components/Sprite";
import { VelocityComponent } from "./game/components/Velocity";
import { Camera } from "./game/core/Camera";
import { Game } from "./game/core/Game";
import { Scene } from "./game/core/Scene";

import { CollisionSystem } from "./game/systems/CollisionSystem";
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

overworld.systemManager.addSystem(new MovementSystem(ctx));
overworld.systemManager.addSystems([new CollisionSystem(), new RenderSystem()]);

const player = overworld.entityManager.createEntity();
player
  .addComponent(new PositionComponent(10, 10))
  .addComponent(new SizeComponent(32, 32))
  .addComponent(new VelocityComponent(120, 120))
  .addComponent(new HealthComponent(100, 100))
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

/* -------------------------------------------------------------------------------------- */
