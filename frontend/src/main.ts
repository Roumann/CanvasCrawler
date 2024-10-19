import { HealthComponent } from "./game/components/Health";
import { PositionComponent } from "./game/components/Position";
import { SizeComponent } from "./game/components/Size";
import { SpriteComponent } from "./game/components/Sprite";
import { SpriteOffsetComponent } from "./game/components/SpriteOffset";
import { TileComponent } from "./game/components/Tile";
import { VelocityComponent } from "./game/components/Velocity";
import { Camera } from "./game/core/Camera";
import { EntityManager } from "./game/managers/EntityManager";
import { CollisionSystem } from "./game/systems/CollisionSystem";
import { MovementSystem } from "./game/systems/Movement";
import { RenderSystem } from "./game/systems/RenderSystem";

import walls from "./map/mapa_1.json";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Create entity manager and systems
const entityManager = new EntityManager();
const movementSystem = new MovementSystem(ctx);
const collisionSystem = new CollisionSystem();
const renderSystem = new RenderSystem();

const map = entityManager.createEntity();
map
  .addComponent(new PositionComponent(0, 0))
  .addComponent(new SizeComponent(3200, 3200))
  .addComponent(new SpriteComponent({ src: "/maps/mapa1.png" }));

walls.forEach((wall) => {
  entityManager
    .createEntity()
    .addComponent(new PositionComponent(wall.x, wall.y))
    .addComponent(new SizeComponent(wall.width, wall.height))
    .addComponent(new TileComponent({ type: "wall" }));
});

// Create a player entity with components
const player = entityManager.createEntity();
player
  .addComponent(new PositionComponent(10, 10))
  .addComponent(new SizeComponent(16, 22))
  .addComponent(new VelocityComponent(120, 120))
  .addComponent(new HealthComponent(100, 100))
  .addComponent(new SpriteComponent({ src: "/characters/char_4.png" }))
  .addComponent(new SpriteOffsetComponent(8, 8));

// create camera
const camera = new Camera({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  context: ctx,
  follow: player,
});

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
    entityManager.getEntitiesWithComponentsExcl(
      ["PositionComponent", "VelocityComponent", "SizeComponent"],
      ["TileComponent"]
    ),
    entityManager.getEntitiesWithComponents(["TileComponent"])
  );

  camera.update();

  // draw system
  // renderSystem.debug = true;
  renderSystem.update(
    entityManager.getEntitiesWithComponents([
      "PositionComponent",
      "SizeComponent",
    ]),
    ctx,
    camera
  );

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
