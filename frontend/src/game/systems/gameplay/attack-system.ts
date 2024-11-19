import { System } from "../../core/System";
import {
  ColliderComponent,
  InventoryComponent,
  PositionComponent,
  SpriteOffsetComponent,
  TagComponent,
  VelocityComponent,
  WeaponComponent,
} from "../../components";
import { Entity } from "../../core";
import { DirectionComponent } from "../../components/physics/DirectionComponent";
import { LifeTimeComponent } from "../../components/gameplay/LifeTimeComponent";
import { DamageComponent } from "../../components/gameplay/DamageComponent";
import { AnimationComponent } from "../../components/rendering/Animation";
import { HitTrackingComponent } from "../../components/gameplay/HitTrackingComponent";

export class PlayerAttackSystem extends System {
  constructor() {
    super();
  }

  // THIS SYSTEM SHOULD ONLY TAKE CARE OF LOOPING THROUGH WEAPONS AND SPAWNING PROJECTILES

  // TODO - Create a behavior component that holds any specific behaviors for the weapon
  // for example, chain reaction - find enemies in range and deal damage to them
  // or fire aspect - add a statusEffect component to the hit enemy and deal damage to them etc.
  // FLOW:
  // call the attack func
  // determine what type of weapon it is - melee, ranged, etc.
  // do the attack
  // last check for behaviors
  // if there are behaviors, do them

  // --- OR ---

  // maybe create separate system for behaviors
  // and then the weapon would only have simple info about the behavior
  // and just put a statusComponent on the enemy which then the system would query

  // TODO think about this more

  update(deltaTime: number) {
    const player = this.scene.entityManager.getEntitiesByTag("player")[0];
    const inventory = player.getComponent(
      "InventoryComponent"
    ) as InventoryComponent;

    if (inventory && inventory.weapons.length > 0) {
      for (const weapon of inventory.weapons) {
        if (weapon.config.cooldown > 0) {
          weapon.config.cooldown -= deltaTime;
          continue;
        } else {
          this.attack(weapon, player);
          weapon.config.cooldown = weapon.config.interval;
        }
      }
    }
  }

  attack(weapon: WeaponComponent, player: Entity) {
    if (!this.scene) return;

    switch (weapon.config.type) {
      case "melee":
        this.meleeAttack(weapon, player);
        break;
      case "ranged":
        this.projectileAttack(weapon, player);
        break;
      default:
        break;
    }
  }

  meleeAttack(weapon: WeaponComponent, player: Entity) {
    const position = player.getComponent(
      "PositionComponent"
    ) as PositionComponent;

    const direction = player.getComponent(
      "DirectionComponent"
    ) as DirectionComponent;

    if (!position || !direction) return;

    const offset = direction.direction === "left" ? -32 : 16;

    const meleeAttack = this.scene.entityManager.createEntity();
    meleeAttack
      .addComponent(
        new PositionComponent({
          x: position.x + offset,
          y: position.y,
        })
      )
      .addComponent(new ColliderComponent(weapon.config.collider))
      .addComponent(weapon.sprite.img)
      .addComponent(new VelocityComponent(weapon.config.velocity))
      .addComponent(new LifeTimeComponent({ time: weapon.config.lifeTime }))
      .addComponent(new DamageComponent({ value: weapon.config.damage }))
      .addComponent(new HitTrackingComponent())
      .addComponent(new DirectionComponent({ direction: direction.direction }))
      .addComponent(new TagComponent({ tag: "melee" }));

    if (weapon.sprite.animation) {
      meleeAttack.addComponent(new AnimationComponent(weapon.sprite.animation));
    }
  }

  projectileAttack(weapon: WeaponComponent, player: Entity) {
    const position = player.getComponent(
      "PositionComponent"
    ) as PositionComponent;

    const direction = player.getComponent(
      "DirectionComponent"
    ) as DirectionComponent;

    if (!position || !direction) return;

    const offsetY = 8;
    const offsetX = direction.direction === "left" ? -32 : 16;

    this.scene.entityManager
      .createEntity()
      .addComponent(
        new PositionComponent({
          x: position.x + offsetX,
          y: position.y + offsetY,
        })
      )
      .addComponent(new ColliderComponent(weapon.config.collider))
      .addComponent(weapon.sprite.img)
      .addComponent(new SpriteOffsetComponent(weapon.sprite.offset))
      .addComponent(new VelocityComponent(weapon.config.velocity))
      .addComponent(new LifeTimeComponent({ time: weapon.config.lifeTime }))
      .addComponent(new DamageComponent({ value: weapon.config.damage }))
      .addComponent(new DirectionComponent({ direction: direction.direction }))
      .addComponent(new TagComponent({ tag: "projectile" }));
  }
}
