import { HealthComponent } from "./game/components/Health";
import { PositionComponent } from "./game/components/Position";
import { ColliderComponent } from "./game/components/Collider";
import { SpriteComponent } from "./game/components/Sprite";
import { SpriteOffsetComponent } from "./game/components/SpriteOffset";
import { TagComponent } from "./game/components/Tag";
import { TileComponent } from "./game/components/Tile";
import { VelocityComponent } from "./game/components/Velocity";
import { Camera } from "./game/core/Camera";
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
import { ProjectileCollisionSystem } from "./game/systems/ProjectileCollision";
import { Game } from "./game/core/Game";
import { Scene } from "./game/core/Scene";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

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

const map = overworld.entityManager.createEntity();
map
  .addComponent(new PositionComponent({ x: 0, y: 0 }))
  .addComponent(
    new SpriteComponent({ src: "/maps/mapa1.png", size: { w: 3200, h: 3200 } })
  );

// Create a player entity with components
const player = overworld.entityManager.createEntity();
player
  .addComponent(new PositionComponent({ x: 10, y: 10 }))
  .addComponent(new ColliderComponent({ w: 16, h: 22 }))
  .addComponent(new VelocityComponent({ vx: 120, vy: 120 }))
  .addComponent(new HealthComponent({ health: 100, maxHealth: 100 }))
  .addComponent(
    new SpriteComponent({
      src: "/characters/char_4.png",
      size: { w: 16, h: 22 },
    })
  )
  .addComponent(new SpriteOffsetComponent({ x: 8, y: 8 }))
  .addComponent(
    new InventoryComponent({
      weapons: [
        new WeaponComponent({
          damage: 10,
          range: 64,
          src: "/items/sword.png",
        }),
      ],
      passiveItems: [
        new PassiveItemComponent({
          name: "Heal",
          description: "Heals 10 health",
        }),
      ],
    })
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

game.addCamera(camera);

overworld.systemManager.addSystems([
  new MovementSystem(ctx),
  new WallCollisionSystem(),
  new EnemyCollisionSystem(),
  new PlayerAttackSystem(),
  new ProjectileCollisionSystem(),
  new RenderSystem({ ctx, camera, debug: true }),
]);

walls.forEach((wall) => {
  overworld.entityManager
    .createEntity()
    .addComponent(new PositionComponent({ x: wall.x, y: wall.y }))
    .addComponent(new ColliderComponent({ w: wall.width, h: wall.height }))
    .addComponent(new TileComponent({ type: "wall" }))
    .addComponent(new TagComponent({ tag: "wall" }));
});

// add enemies
for (let i = 0; i < 20; i++) {
  overworld.entityManager
    .createEntity()
    .addComponent(
      new PositionComponent({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      })
    )
    .addComponent(new ColliderComponent({ w: 32, h: 32 }))
    .addComponent(new VelocityComponent({ vx: 120, vy: 120 }))
    .addComponent(new HealthComponent({ health: 100, maxHealth: 100 }))
    .addComponent(new CollisionDamageComponent({ damage: 10 }))
    .addComponent(
      new SpriteComponent({
        src: "/characters/enemy1.png",
        size: { w: 32, h: 32 },
      })
    )
    .addComponent(new TagComponent({ tag: "enemy" }));
}

game.addScene(overworld);

let lastTime = 0;
function gameLoop(timestamp: number) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  game.start(deltaTime);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
