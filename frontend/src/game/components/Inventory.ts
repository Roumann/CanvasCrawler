import { WeaponComponent } from "../base/Weapon";

export type TInventoryComponent = {
  weapons: WeaponComponent[];
};

export class InventoryComponent {
  weapons: WeaponComponent[];

  constructor({ weapons }: TInventoryComponent) {
    this.weapons = [...weapons];
  }

  addWeapon(weapon: WeaponComponent) {
    this.weapons.push(weapon);
  }
}
