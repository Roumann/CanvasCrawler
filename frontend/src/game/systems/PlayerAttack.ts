import { CollisionDamageComponent } from "../components/CollisionDamage";
import { InventoryComponent } from "../components/Inventory";
import { PositionComponent } from "../components/Position";
import { SizeComponent } from "../components/Size";
import { SpriteComponent } from "../components/Sprite";
import { TagComponent } from "../components/Tag";
import { VelocityComponent } from "../components/Velocity";
import { Entity } from "../core/Entity";
import { System } from "../core/System";
import { EntityManager } from "../managers/EntityManager";

export class PlayerAttackSystem extends System {
  constructor() {
    super();
  }

  update(player: Entity, entityManager: EntityManager) {
    const inventory = player.getComponent(
      "InventoryComponent"
    ) as InventoryComponent;
    const position = player.getComponent("PositionComponent");

    inventory.weapons.forEach((weapon) => {
      weapon.attack();
    });
  }
}

// const sword = entityManager.createEntity();
//       sword
//         .addComponent(new PositionComponent(position.x, position.y))
//         .addComponent(new SizeComponent(64, 64))
//         .addComponent(new SpriteComponent({ src: "/items/sword.png" }))
//         .addComponent(new TagComponent("weapon"));
