import { World, Scene } from "./game/core";

import {
  AnimationSystem,
  EnemyCollisionSystem,
  MovementSystem,
  PlayerAttackSystem,
  ProjectileSystem,
  RenderSystem,
  WallCollisionSystem,
} from "./game/systems";

import {
  AnimationComponent,
  CameraFollowComponent,
  ColliderComponent,
  CollisionDamageComponent,
  DirectionComponent,
  HealthComponent,
  InventoryComponent,
  PassiveItemComponent,
  PositionComponent,
  SpriteComponent,
  SpriteOffsetComponent,
  TagComponent,
  VelocityComponent,
} from "./game/components";

import { playerAnimations } from "./game/animations/player";
import { EventDispatcher } from "./game/core/Events";
import { weaponFactory } from "./game/archetypes/weapons/WeaponFactory";
import walls from "./game/config/map/mapa_1.json";

import { InventoryUISystem } from "./game/systems/rendering/InventoryUISystem";
import { CollisionSystem } from "./game/systems/physics/Collision";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const world = new World({
  isPaused: false, // TODO Maybe move this to the scene? so when switching scenes it can be paused / or teardown
});

const overworld = new Scene({
  name: "overworld",
  context: ctx,
  camera: {
    bounds: { min: 0, max: 3200 },
  },
  background: {
    src: "/maps/mapa1.png",
    size: { w: 3200, h: 3200 },
  },
  walls: walls,
});

// Add all the systems to the scene
// all of them will be auto updated in the game loop and run on entities in the scene
// ORDER IS IMPORTANT!!!!!
overworld.systemManager.addSystems([
  new MovementSystem(),
  new AnimationSystem(),
  // new CollisionSystem(),
  new WallCollisionSystem(),
  new EnemyCollisionSystem(),
  new PlayerAttackSystem(),
  new ProjectileSystem(),
  new RenderSystem({ debug: true }),
  // new InventoryUISystem({ context: ctx }),
]);

AddEnemies();

const player = overworld.entityManager.createEntity();
player
  .addComponent(new PositionComponent({ x: 10, y: 10 }))
  .addComponent(new ColliderComponent({ w: 16, h: 22 }))
  .addComponent(new VelocityComponent({ vx: 120, vy: 120 }))
  .addComponent(new HealthComponent({ health: 100 }))
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
      frameRate: 12,
      animationType: "loop",
    })
  )
  .addComponent(new DirectionComponent({ direction: "right" }))
  .addComponent(new SpriteOffsetComponent({ x: 8, y: 8 }))
  .addComponent(
    new InventoryComponent({
      weapons: [
        weaponFactory.createWeapon("fireball"),
        weaponFactory.createWeapon("sword"),
      ],
      items: [
        new PassiveItemComponent({
          name: "Heal",
          description: "Heals 10 health",
        }),
      ],
    })
  )
  .addComponent(new DirectionComponent({ direction: "right" }))
  .addComponent(new CameraFollowComponent())
  .addComponent(new TagComponent({ tag: "player" }))
  .addComponent(new EventDispatcher());

world.addScene(overworld);

// TODO maybe move this to the World class
let lastTime = 0;
let spawnTime = 10;
function gameLoop(timestamp: number) {
  const deltaTime = (timestamp - lastTime) / 1000; // in seconds
  lastTime = timestamp;

  if (spawnTime < 0) {
    // AddEnemies();
    spawnTime = 10;
  }
  spawnTime -= deltaTime;

  // TODO not a fan of this
  world.start(deltaTime);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function AddEnemies() {
  for (let i = 0; i < 20; i++) {
    overworld.entityManager
      .createEntity()
      .addComponent(
        new PositionComponent({
          x: Math.random() * 1000,
          y: Math.random() * 1000,
        })
      )
      .addComponent(
        new ColliderComponent({
          w: 16,
          h: 22,
        })
      )
      .addComponent(new VelocityComponent({ vx: 120, vy: 120 }))
      .addComponent(new HealthComponent({ health: 100 })) // TODO change this
      .addComponent(new CollisionDamageComponent({ damage: 10 }))
      .addComponent(
        new AnimationComponent({
          animations: playerAnimations,
          currentAnimation: "idle-right",
          spriteGridSize: { w: 32, h: 32 },
          frameRate: 16,
        })
      )
      .addComponent(new SpriteOffsetComponent({ x: 8, y: 8 }))
      .addComponent(
        new SpriteComponent({
          src: "/characters/enemy_char.png",
          size: { w: 15, h: 21 },
        })
      )
      .addComponent(new TagComponent({ tag: "enemy" }));
  }
}
