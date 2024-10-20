import { HealthComponent } from "./game/components/Health";
import { PositionComponent } from "./game/components/Position";
import { SizeComponent } from "./game/components/Size";
import { SpriteComponent } from "./game/components/Sprite";
import { SpriteOffsetComponent } from "./game/components/SpriteOffset";
import { TagComponent } from "./game/components/Tag";
import { TileComponent } from "./game/components/Tile";
import { VelocityComponent } from "./game/components/Velocity";
import { Camera } from "./game/core/Camera";
import { EntityManager } from "./game/managers/EntityManager";
import { WallCollisionSystem } from "./game/systems/WallCollision";
import { MovementSystem } from "./game/systems/Movement";
import { RenderSystem } from "./game/systems/RenderSystem";

import walls from "./map/mapa_1.json";
import { EnemyCollisionSystem } from "./game/systems/EnemyCollision";
import { CollisionDamageComponent } from "./game/components/CollisionDamage";
import { InventoryComponent } from "./game/components/Inventory";
import { WeaponComponent } from "./game/components/Weapon";
import { PassiveItemComponent } from "./game/components/PassiveItem";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Create entity manager and systems
const entityManager = new EntityManager();
const movementSystem = new MovementSystem(ctx);
const wallCollision = new WallCollisionSystem();
const enemyCollision = new EnemyCollisionSystem();
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
    .addComponent(new TileComponent({ type: "wall" }))
    .addComponent(new TagComponent("wall"));
});

// add enemies
for (let i = 0; i < 20; i++) {
  entityManager
    .createEntity()
    .addComponent(
      new PositionComponent(Math.random() * 1000, Math.random() * 1000)
    )
    .addComponent(new SizeComponent(32, 32))
    .addComponent(new VelocityComponent(120, 120))
    .addComponent(new HealthComponent(100, 100))
    .addComponent(new CollisionDamageComponent(10))
    .addComponent(new SpriteComponent({ src: "/characters/enemy1.png" }))
    .addComponent(new TagComponent("enemy"));
}

// Create a player entity with components
const player = entityManager.createEntity();
player
  .addComponent(new PositionComponent(10, 10))
  .addComponent(new SizeComponent(16, 22))
  .addComponent(new VelocityComponent(120, 120))
  .addComponent(new HealthComponent(100, 100))
  .addComponent(new SpriteComponent({ src: "/characters/char_4.png" }))
  .addComponent(new SpriteOffsetComponent(8, 8))
  .addComponent(
    new InventoryComponent(
      [new WeaponComponent(10, 10), new WeaponComponent(10, 10)],
      [new PassiveItemComponent("test", "test")]
    )
  )
  .addComponent(new TagComponent("player"));

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
    entityManager.getEntitiesWithComponentsExcl(
      ["PositionComponent", "VelocityComponent", "SpriteOffsetComponent"],
      ["TileComponent"]
    ),
    deltaTime
  );

  enemyCollision.update(
    entityManager.getEntitiesByTag("player")[0],
    entityManager.getEntitiesByTag("enemy")
  );

  wallCollision.update(
    entityManager.getEntitiesByTag("player"),
    entityManager.getEntitiesByTag("wall")
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
