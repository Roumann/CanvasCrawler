import { PassiveItemComponent } from "./PassiveItem";
import { WeaponComponent } from "./Weapon";

export class InventoryComponent {
  weapons: WeaponComponent[];
  passiveItems: PassiveItemComponent[];

  constructor(
    weapons: WeaponComponent[],
    passiveItems: PassiveItemComponent[]
  ) {
    this.weapons = [...weapons];
    this.passiveItems = [...passiveItems];

    console.log(this.weapons);
    console.log(this.passiveItems);
  }

  addWeapon(weapon: WeaponComponent) {
    this.weapons.push(weapon);
  }

  addPassiveItem(passiveItem: PassiveItemComponent) {
    this.passiveItems.push(passiveItem);
  }
}
