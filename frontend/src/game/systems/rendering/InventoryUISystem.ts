import { System } from "../../../engine/core";
import {
  HealthComponent,
  InventoryComponent,
  PositionComponent,
} from "../../components";

export type TInventoryUISystem = {
  context: CanvasRenderingContext2D | null;
};

export class InventoryUISystem extends System {
  ctx: CanvasRenderingContext2D | null;

  constructor({ context }: TInventoryUISystem) {
    super();
    this.ctx = context;
  }

  update(deltaTime: number) {
    if (!this.ctx) return;

    const player = this.scene.entityManager.getEntityByTag("player");
    const playerInventory =
      player.getComponent<InventoryComponent>("InventoryComponent");
    const position =
      player.getComponent<PositionComponent>("PositionComponent");
    const healthBar = player.getComponent<HealthComponent>("HealthComponent");

    if (!playerInventory || !position || !healthBar) return;

    this.ctx.imageSmoothingEnabled = false;
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(position.pos.x, position.pos.y + 25, healthBar.health, 3);

    for (let i = 0; i < playerInventory.weapons.length; i++) {
      this.ctx.fillStyle = "red";
      this.ctx.strokeRect(i * 32, 0, 32, 32);

      this.ctx.drawImage(
        playerInventory.weapons[i].sprite.img.image,
        0,
        0,
        32,
        32,
        i * 32,
        0,
        32,
        32
      );

      this.ctx.fillText(
        playerInventory.weapons[i].info.name.toString(),
        i * 32,
        32
      );
    }
  }
}
