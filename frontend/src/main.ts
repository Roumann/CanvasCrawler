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
import { PlayerAttackSystem } from "./game/systems/PlayerAttack";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Create entity manager and systems
const entityManager = new EntityManager();
const movementSystem = new MovementSystem(ctx);
const wallCollision = new WallCollisionSystem();
const enemyCollision = new EnemyCollisionSystem();
const renderSystem = new RenderSystem();
const playerAttackSystem = new PlayerAttackSystem();

const map = entityManager.createEntity();
map
  .addComponent(new PositionComponent({ x: 0, y: 0 }))
  .addComponent(new SizeComponent({ w: 3200, h: 3200 }))
  .addComponent(new SpriteComponent({ src: "/maps/mapa1.png" }));

walls.forEach((wall) => {
  entityManager
    .createEntity()
    .addComponent(new PositionComponent({ x: wall.x, y: wall.y }))
    .addComponent(new SizeComponent({ w: wall.width, h: wall.height }))
    .addComponent(new TileComponent({ type: "wall" }))
    .addComponent(new TagComponent({ tag: "wall" }));
});

// add enemies
for (let i = 0; i < 20; i++) {
  entityManager
    .createEntity()
    .addComponent(
      new PositionComponent({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      })
    )
    .addComponent(new SizeComponent({ w: 32, h: 32 }))
    .addComponent(new VelocityComponent({ vx: 120, vy: 120 }))
    .addComponent(new HealthComponent({ health: 100, maxHealth: 100 }))
    .addComponent(new CollisionDamageComponent({ damage: 10 }))
    .addComponent(new SpriteComponent({ src: "/characters/enemy1.png" }))
    .addComponent(new TagComponent({ tag: "enemy" }));
}

// const sword = new WeaponComponent(50, 20, "/items/sword.png");
const heal = new PassiveItemComponent({
  name: "Heal",
  description: "Heals 10 health",
});
const test = new WeaponComponent({ damage: 1, range: 2, src: "" });

// Create a player entity with components
const player = entityManager.createEntity();
player
  .addComponent(new PositionComponent({ x: 10, y: 10 }))
  .addComponent(new SizeComponent({ w: 16, h: 22 }))
  .addComponent(new VelocityComponent({ vx: 120, vy: 120 }))
  .addComponent(new HealthComponent({ health: 100, maxHealth: 100 }))
  .addComponent(new SpriteComponent({ src: "/characters/char_4.png" }))
  .addComponent(new SpriteOffsetComponent({ x: 8, y: 8 }))
  .addComponent(
    new InventoryComponent({ weapons: [test], passiveItems: [heal] })
  )
  .addComponent(new TagComponent({ tag: "player" }));

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

  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

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
    entityManager.getEntitiesByTag("enemy"),
    entityManager
  );

  playerAttackSystem.update(
    entityManager.getEntitiesByTag("player")[0],
    entityManager
  );

  wallCollision.update(
    entityManager.getEntitiesByTag("player"),
    entityManager.getEntitiesByTag("wall")
  );

  camera.update();

  // draw system
  renderSystem.debug = true;
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
