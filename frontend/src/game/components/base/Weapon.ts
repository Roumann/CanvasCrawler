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
  src: string;
};

export class WeaponComponent {
  damage: number;
  range: number;
  sprite: SpriteComponent;
  position: PositionComponent;
  collider: ColliderComponent;

  constructor({ damage, range, src }: TWeaponComponent) {
    this.damage = damage;
    this.range = range;
    this.sprite = new SpriteComponent({
      src: src ?? "/items/sword.png",
      size: { w: 64, h: 64 },
    });
    this.position = new PositionComponent({ x: 0, y: 0 });
    this.collider = new ColliderComponent({ w: 64, h: 64 });
  }

  attack(entityManager: EntityManager | null, player: Entity) {
    if (!entityManager) return;

    const playerPos = player.getComponent(
      "PositionComponent"
    ) as PositionComponent;

    entityManager
      .createEntity()
      .addComponent(new PositionComponent({ x: playerPos.x, y: playerPos.y }))
      .addComponent(new ColliderComponent({ w: 8, h: 8 }))
      .addComponent(
        new SpriteComponent({ src: "/items/gem.png", size: { w: 8, h: 8 } })
      )
      .addComponent(new VelocityComponent({ vx: 60, vy: 60 }))
      .addComponent(new LifeTimeComponent({ time: 2 }))
      .addComponent(new DamageComponent({ value: 10 }))
      .addComponent(new DirectionComponent({}))
      .addComponent(new TagComponent({ tag: "projectile" }));
  }
}
