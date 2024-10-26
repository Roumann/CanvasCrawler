import { PositionComponent } from "./Position";
import { ColliderComponent } from "./Collider";
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

  attack() {}
}
