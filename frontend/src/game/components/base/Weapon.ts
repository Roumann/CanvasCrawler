import { Entity } from "../../core";
import { EntityManager } from "../../managers/EntityManager";
import { DamageComponent } from "../gameplay/DamageComponent";
import { LifeTimeComponent } from "../gameplay/LifeTimeComponent";
import { ColliderComponent } from "../physics/Collider";
import { DirectionComponent } from "../physics/DirectionComponent";
import { VelocityComponent } from "../physics/Velocity";
import { SpriteComponent } from "../rendering/Sprite";
import { TagComponent } from "../systems/Tag";
import { PositionComponent } from "./Position";

export type TWeaponComponent = {
  damage: number;
  range: number;
  size: { w: number; h: number };
  collider: { w: number; h: number };
  velocity: { vx: number; vy: number };
  lifeTime: number;
  tag: string;
  direction?: "up" | "down" | "left" | "right";
  src: string;
};

export class WeaponComponent {
  damage: number;
  range: number;
  sprite: {
    src: string;
    size: { w: number; h: number };
  };
  collider: { w: number; h: number };
  velocity: { vx: number; vy: number };
  lifeTime: number;
  direction?: "up" | "down" | "left" | "right" | null;
  tag: string;

  constructor({
    damage,
    range,
    size,
    collider,
    velocity,
    lifeTime,
    tag,
    direction,
    src,
  }: TWeaponComponent) {
    this.damage = damage;
    this.range = range; // TODO implement range
    this.sprite = {
      src: src ?? "/items/sword.png",
      size: size ?? { w: 32, h: 32 },
    };
    this.collider = collider ?? { w: 32, h: 32 };
    this.velocity = velocity ?? { vx: 60, vy: 60 };
    this.lifeTime = lifeTime ?? 2;
    this.direction = direction ?? null;
    this.tag = tag ?? "projectile";
  }

  attack(entityManager: EntityManager | null, player: Entity) {
    if (!entityManager) return;

    const playerPos = player.getComponent(
      "PositionComponent"
    ) as PositionComponent;

    entityManager
      .createEntity()
      .addComponent(new PositionComponent({ x: playerPos.x, y: playerPos.y }))
      .addComponent(new ColliderComponent(this.collider))
      .addComponent(new SpriteComponent(this.sprite))
      .addComponent(new VelocityComponent(this.velocity))
      .addComponent(new LifeTimeComponent({ time: this.lifeTime }))
      .addComponent(new DamageComponent({ value: this.damage }))
      .addComponent(new DirectionComponent({ direction: this.direction }))
      .addComponent(new TagComponent({ tag: this.tag }));
  }
}
