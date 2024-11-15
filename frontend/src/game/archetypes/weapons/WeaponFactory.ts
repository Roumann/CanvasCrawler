import { swordAnimation } from "../../animations/sword";
import { SpriteComponent, WeaponComponent } from "../../components";

type WeaponType = "sword" | "fireball";

// TODO COMPLETELY REWORK HOW I INITIALIZE THIS
class WeaponFactory {
  createWeapon(type: WeaponType) {
    switch (type) {
      case "sword":
        return new WeaponComponent({
          info: {
            name: "sword",
            desc: "A basic sword",
          },
          config: {
            type: "melee",
            damage: 10,
            range: 10,
            lifeTime: 0.3,
            cooldown: 1,
            interval: 1,
            collider: { w: 32, h: 32 },
            velocity: { vx: 0, vy: 0 },
          },
          sprite: {
            img: new SpriteComponent({
              src: "/items/sword.png",
              size: { w: 32, h: 32 },
            }),
            offset: { x: 8, y: 8 },
            animation: {
              animations: swordAnimation,
              currAnimation: "slash",
              spriteGridSize: { w: 32, h: 32 },
              frameRate: 8,
              animationType: "once",
            },
          },
        });

      case "fireball":
        return new WeaponComponent({
          info: {
            name: "Fireball",
            desc: "A fireball",
          },
          config: {
            type: "ranged",
            damage: 50,
            range: 10,
            lifeTime: 2,
            cooldown: 0.5,
            interval: 0.5,
            collider: { w: 32, h: 15 },
            velocity: { vx: 120, vy: 120 },
          },
          sprite: {
            img: new SpriteComponent({
              src: "/weapons/projectiles/fireball.png",
              size: { w: 32, h: 15 },
            }),
            offset: { x: 0, y: 8 },
          },
        });

      default:
        throw new Error(`Unknown weapon type: ${type}`);
    }
  }
}

export const weaponFactory = new WeaponFactory();
