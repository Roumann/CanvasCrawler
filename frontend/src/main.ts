import { World, Scene } from "./game/core";

import {
  EnemyCollisionSystem,
  MovementSystem,
  PlayerAttackSystem,
  ProjectileSystem,
  RenderSystem,
  WallCollisionSystem,
} from "./game/systems";

import {
  ColliderComponent,
  CollisionDamageComponent,
  HealthComponent,
  InventoryComponent,
  PassiveItemComponent,
  PositionComponent,
  SpriteComponent,
  SpriteOffsetComponent,
  TagComponent,
  TileComponent,
  VelocityComponent,
  WeaponComponent,
} from "./game/components";

import walls from "./game/config/map/mapa_1.json";
import { DirectionComponent } from "./game/components/physics/DirectionComponent";
import { AnimationComponent } from "./game/components/rendering/Animation";
import { playerAnimations } from "./game/animations/player";
import { CameraFollowComponent } from "./game/components/rendering/CameraFollow";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Create game class that holds everything
const world = new World({
  // change this to viewport
  width: 256,
  height: 256,
  isPaused: false,
});

// Create Scene where all entities live
const overworld = new Scene({
  name: "overworld",
  context: ctx,
  camera: {
    bounds: { min: 0, max: 3200 },
  },
});

// I dont like this order of adding components
// maybe add map creation as part on Scene init?
const map = overworld.entityManager.createEntity();
map
  .addComponent(new PositionComponent({ x: 0, y: 0 }))
  .addComponent(
    new SpriteComponent({ src: "/maps/mapa1.png", size: { w: 3200, h: 3200 } })
  );

// Add all the systems to the scene
// all of them will be auto updated in the game loop and run on entities in the scene
// ORDER IS IMPORTANT!!!!!
overworld.systemManager.addSystems([
  new MovementSystem(ctx),
  new WallCollisionSystem(),
  new EnemyCollisionSystem(),
  new PlayerAttackSystem(),
  new ProjectileSystem(),
  // Not sure about this? passing ctx and camera to render system?
  new RenderSystem({ ctx, debug: true }), // system has access to scene so it can take the ctx from there
]);

// Add walls to the scene from Tiled exported file
// TODO move this somewhere else
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
      size: { w: 15, h: 21 },
    })
  )
  .addComponent(
    new AnimationComponent({
      animations: playerAnimations,
      currentAnimation: "idle-right",
      spriteGridSize: { w: 32, h: 32 },
      frameRate: 16,
    })
  )
  .addComponent(new DirectionComponent({ direction: "right" }))
  .addComponent(new SpriteOffsetComponent({ x: 8, y: 8 }))
  .addComponent(
    new InventoryComponent({
      weapons: [
        new WeaponComponent({
          damage: 10,
          range: 10,
          size: { w: 32, h: 32 },
          collider: { w: 32, h: 32 },
          velocity: { vx: 60, vy: 60 },
          lifeTime: 2,
          tag: "projectile",
          src: "/items/sword.png",
        }),
        new WeaponComponent({
          damage: 5,
          range: 10,
          size: { w: 8, h: 8 },
          collider: { w: 8, h: 8 },
          velocity: { vx: 220, vy: 220 },
          lifeTime: 2,
          tag: "projectile",
          src: "/items/gem.png",
          direction: "right",
          // TODO - add attack pattern - e.g. straight, random, both sides left/right or up/down etc.
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
  .addComponent(new DirectionComponent({ direction: "right" }))
  .addComponent(new CameraFollowComponent())
  .addComponent(new TagComponent({ tag: "player" }));

// finally add the constructed scene to the game
world.addScene(overworld);

// create a loop that will run the game
let lastTime = 0;
function gameLoop(timestamp: number) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  world.start(deltaTime);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
