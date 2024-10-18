import { HealthComponent } from "./game/components/Health";
import { PositionComponent } from "./game/components/Position";
import { SizeComponent } from "./game/components/Size";
import { SpriteComponent } from "./game/components/Sprite";
import { VelocityComponent } from "./game/components/Velocity";

import { Scene } from "./game/core/Scene";
import { World } from "./game/core/World";
import { EntityManager } from "./game/managers/EntityManager";
import { CollisionSystem } from "./game/systems/CollisionSystem";
import { DrawSystem } from "./game/systems/DrawSystem";
import { MovementSystem } from "./game/systems/Movement";

// import * as enemyData from "./game/archetypes/Enemy.json";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

/* -------------------------------------------------------------------------------------- */

// world or maybe Scene??  will hold Canvas context TODO research
const world = new World({
  isPaused: false,
  context: ctx,
});

const overworld = new Scene("overwold");
// Add single systems to scene
overworld.systemManager.addSystem(new MovementSystem());
// Add multiple systems to scene
overworld.systemManager.addSystems([new CollisionSystem(), new DrawSystem()]);

// Add entities to scene
overworld.entityManager
  .createEntity()
  .addComponent(new PositionComponent(10, 10))
  .addComponent(new SizeComponent(32, 32))
  .addComponent(new VelocityComponent(120, 120))
  .addComponent(new HealthComponent(100, 100))
  .addComponent(new SpriteComponent({ src: "/characters/char_4.png" }));

// add scene to world
world.addScene(overworld);

// update scene

// render scene

/* -------------------------------------------------------------------------------------- */

// Create entity manager and systems
const entityManager = new EntityManager();
const movementSystem = new MovementSystem();
const collisionSystem = new CollisionSystem();
const drawSystem = new DrawSystem();

// Create a player entity with components
const player = entityManager.createEntity();
player
  .addComponent(new PositionComponent(10, 10))
  .addComponent(new SizeComponent(32, 32))
  .addComponent(new VelocityComponent(120, 120))
  .addComponent(new HealthComponent(100, 100))
  .addComponent(new SpriteComponent({ src: "/characters/char_4.png" }));

// create seperate wall init function - Init Map, then walls, then objects

// Game loop
let lastTime = 0;

function gameLoop(timestamp: number) {
  if (!ctx) return;

  const deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
  lastTime = timestamp;

  // Update systems
  movementSystem.update(
    entityManager.getEntitiesWithComponents([
      "PositionComponent",
      "VelocityComponent",
    ]),
    deltaTime
  );

  collisionSystem.update(
    entityManager.getEntitiesWithComponents([
      "PositionComponent",
      "VelocityComponent",
      "SizeComponent",
    ]),
    entityManager.getEntitiesWithComponents(["WallComponent"])
  );

  // draw system
  // drawSystem.debug = true;
  drawSystem.render(
    entityManager.getEntitiesWithComponents([
      "PositionComponent",
      "SizeComponent",
    ]),
    ctx
  );

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
