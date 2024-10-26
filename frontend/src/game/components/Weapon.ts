import { PositionComponent } from "./Position";
import { SizeComponent } from "./Size";
import { SpriteComponent } from "./Sprite";

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
  size: SizeComponent;

  constructor({ damage, range, src }: TWeaponComponent) {
    this.damage = damage;
    this.range = range;
    this.sprite = new SpriteComponent({ src: src ?? "/items/sword.png" });
    this.position = new PositionComponent({ x: 0, y: 0 });
    this.size = new SizeComponent({ w: 64, h: 64 });
  }

  attack() {
    console.log("attack");
  }
}
