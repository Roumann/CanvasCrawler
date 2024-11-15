import { WeaponComponent } from "../base/Weapon";
import { PassiveItemComponent } from "./PassiveItem";

export type TInventoryComponent = {
  weapons: WeaponComponent[];
  items: PassiveItemComponent[];
};

export class InventoryComponent {
  weapons: WeaponComponent[];
  items: PassiveItemComponent[];

  constructor({ weapons, items }: TInventoryComponent) {
    this.weapons = [...weapons];
    this.items = [...items];
  }

  addWeapon(weapon: WeaponComponent) {
    this.weapons.push(weapon);
  }

  addPassiveItem(passiveItem: PassiveItemComponent) {
    this.items.push(passiveItem);
  }
}
