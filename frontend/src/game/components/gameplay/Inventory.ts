import { WeaponComponent } from "../base/Weapon";
import { PassiveItemComponent } from "./PassiveItem";

export type TInventoryComponent = {
  weapons: WeaponComponent[];
  passiveItems: PassiveItemComponent[];
};

export class InventoryComponent {
  weapons: WeaponComponent[];
  passiveItems: PassiveItemComponent[];

  constructor({ weapons, passiveItems }: TInventoryComponent) {
    this.weapons = [...weapons];
    this.passiveItems = [...passiveItems];
  }

  addWeapon(weapon: WeaponComponent) {
    this.weapons.push(weapon);
  }

  addPassiveItem(passiveItem: PassiveItemComponent) {
    this.passiveItems.push(passiveItem);
  }
}
