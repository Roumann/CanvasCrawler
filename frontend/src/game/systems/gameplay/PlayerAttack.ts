import { ColliderComponent } from "../../components/physics/Collider";
import { HealthComponent } from "../../components/gameplay/Health";
import { PositionComponent } from "../../components/base/Position";
import { SpriteComponent } from "../../components/rendering/Sprite";
import { TagComponent } from "../../components/systems/Tag";
import { System } from "../../core/System";
import { InventoryComponent } from "../../components";
import { WeaponComponent } from "../../components/base/Weapon";

export class PlayerAttackSystem extends System {
  attackTimer: number = 0;
  attackDelay: number = 600; // 600 ms delay between attacks

  constructor() {
    super();
  }

  update(deltaTime: number) {
    this.attackTimer += deltaTime * 1000;

    const player = this.scene.entityManager.getEntitiesByTag("player")[0];
    const inventory = player.getComponent(
      "InventoryComponent"
    ) as InventoryComponent;

    // TODO rework weapon delay instead of centralized timer, have each weapon have its own timer
    if (inventory && inventory.weapons.length > 0) {
      if (this.attackTimer < this.attackDelay) return;
      this.attackTimer = 0;

      for (const weapon of inventory.weapons) {
        weapon.attack(this.scene.entityManager, player);
      }
    }

    // if (inventory && inventory.weapons.length > 0) {
    //   this.attackTimer += deltaTime * 1000;

    //   inventory.weapons.forEach((weapon) => {
    //     // Render and handle the attack animation without recreating the weapon
    //     if (this.attackTimer < this.attackDelay) return;
    //     this.attackTimer = 0;

    //     console.log(weapon.damage);
    //     weapon.attack(this.entityManager, player);

    //     // Deal damage to enemies in range
    //     // this.dealDamageInRange(position, weapon);

    //     // Clear the attack animation
    //   });
    // }
  }

  dealDamageInRange(position: PositionComponent, weapon: WeaponComponent) {
    const damage = weapon.damage;
    const attackRange = weapon.range;

    const enemies = this.scene.entityManager.getEntitiesByTag("enemy");

    enemies.forEach((enemy) => {
      const enemyPos = enemy.getComponent(
        "PositionComponent"
      ) as PositionComponent;

      const health = enemy.getComponent("HealthComponent") as HealthComponent;
      const enemyId = enemy.id;

      if (this.isInRange(position, enemyPos, attackRange) && health) {
        console.log(damage);
        health.takeDamage(damage);

        if (health.health === -500) {
          // TODO FIX THIS

          this.scene.entityManager
            .createEntity()
            .addComponent(
              new PositionComponent({ x: enemyPos.x, y: enemyPos.y })
            )
            .addComponent(new ColliderComponent({ w: 32, h: 32 }))
            .addComponent(new SpriteComponent({ src: "/items/gem.png" }))
            .addComponent(new TagComponent({ tag: "drop" }));

          this.scene.entityManager.removeEntityById(enemyId);
          health.health = 100;
        }
      }
    });
  }

  isInRange(
    pos1: PositionComponent,
    pos2: PositionComponent,
    range: number
  ): boolean {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy) <= range;
  }
}
