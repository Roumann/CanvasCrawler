import { Player } from "../../core/Player";

export class WeaponFactory {
  //TODO create Player class
  static createWeapon(type: string, player: Player) {
    switch (type) {
      case "whip":
      // return new Sword(player, {
      //   damage: 10,
      //   cooldown: 2.0,
      //   level: 1,
      //   maxLevel: 8,
      //   area: 100,
      // });
      //   case "throwingKnife":
      //     return new ThrowingKnife(player, {
      //       damage: 15,
      //       cooldown: 1.0,
      //       level: 1,
      //       maxLevel: 8,
      //       projectileSpeed: 300,
      //     });
      default:
        throw new Error(`Unknown weapon type: ${type}`);
    }
  }
}
