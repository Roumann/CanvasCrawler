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
  PositionComponent,
  SpriteComponent,
  SpriteOffsetComponent,
  TagComponent,
  VelocityComponent,
} from "./game/components";
import { FollowPlayerComponent } from "./game/components/FollowPlayer";
import { AccelerationComponent } from "./game/components/Acceleration";

import { PlayerAnimations, playerAnimations } from "./game/animations/player";

import walls from "./game/config/map/mapa_1.json";

import { InventoryUISystem } from "./game/systems/rendering/InventoryUISystem";
import { CollisionSystem } from "./game/systems/physics/Collision";
import { EnemyMovement } from "./game/systems/gameplay/EnemyMovement";
import { KeyboardControls } from "./game/components/KeyboardControls";
import { Engine } from "./engine/core/engine";
import { Scene } from "./engine/core/scene";
import { weaponFactory } from "./game/prefabs/weapons/WeaponFactory";
import { Rect } from "./engine/math/rect";
import { MenuSystem } from "./game/systems/rendering/MenuSystem";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Canvas not found");

const world = new Engine();

const overworld = new Scene({
  name: "overworld",
  context: ctx,
  bounds: new Rect({ x: 0, y: 0, w: 3200, h: 3200 }),

  // TODO - add option to creating the world
  // Either what i have right now static image and array of walls or
  // allow user to use Tilemap and create the world from it
  environment: {
    src: "/maps/mapa1.png",
    size: { w: 3200, h: 3200 },
    walls: walls,
  },
});

overworld.systemManager.addSystems([
  new MovementSystem(),
  // new EnemyMovement(), // TODO maybe create geenral movement component and then add keyboard component that will controlls the movement or enemyAI system that will controll it
  new WallCollisionSystem(),
  new MenuSystem(),
  // new CollisionSystem(),
  new EnemyCollisionSystem(),
  new PlayerAttackSystem(),
  new ProjectileSystem(),
  new AnimationSystem(),
  new RenderSystem({ debug: true }),
  // new InventoryUISystem({ context: ctx }),
]);

AddEnemies();

const player = overworld.entityManager.createEntity();
player
  .addComponent(new PositionComponent({ x: 10, y: 10 }))
  .addComponent(new VelocityComponent({ vx: 1, vy: 1, friction: 0.6 }))
  .addComponent(new AccelerationComponent({ ax: 1, ay: 1, base: 1 }))
  .addComponent(new ColliderComponent({ w: 16, h: 22 }))
  .addComponent(new DirectionComponent({ direction: "right" }))
  .addComponent(
    new SpriteComponent({
      src: "/characters/char_4.png",
      size: { w: 15, h: 21 },
    })
  )
  .addComponent(new SpriteOffsetComponent({ x: 8, y: 8 }))
  .addComponent(
    new AnimationComponent({
      animations: playerAnimations,
      currentAnimation: "idle-right" as PlayerAnimations,
      frameSize: { w: 32, h: 32 },
      frameRate: 16,
      loop: true,
    })
  )
  .addComponent(
    new InventoryComponent({
      weapons: [
        weaponFactory.createWeapon("fireball"),
        weaponFactory.createWeapon("sword"),
      ],
    })
  )
  .addComponent(new HealthComponent({ health: 100 }))
  .addComponent(new CameraFollowComponent())
  .addComponent(new KeyboardControls())
  .addComponent(new TagComponent({ tag: "player" }));

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
  console.log("adding enemies");
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
      .addComponent(new VelocityComponent({ vx: 120, vy: 120, friction: 0.1 }))
      .addComponent(new HealthComponent({ health: 100 })) // TODO change this
      .addComponent(new CollisionDamageComponent({ damage: 10 }))
      .addComponent(
        new AnimationComponent({
          animations: playerAnimations,
          currentAnimation: "idle-right",
          frameSize: { w: 32, h: 32 },
          frameRate: 16,
          loop: true,
        })
      )
      .addComponent(new FollowPlayerComponent())
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
