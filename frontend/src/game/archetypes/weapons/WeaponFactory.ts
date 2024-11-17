import { SlashAnimation, slashAnimation } from "../../animations/slash";
import { swordAnimation } from "../../animations/sword";
import {
  AnimationComponent,
  SpriteComponent,
  WeaponComponent,
} from "../../components";

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
            damage: 25, // TODO - like sprite
            range: 10,
            lifeTime: 0.3, // TODO - like sprite
            cooldown: 1,
            interval: 1,
            collider: { w: 64, h: 32 }, // TODO - like sprite
            velocity: { vx: 0, vy: 0 }, // TODO - like sprite
          },
          sprite: {
            img: new SpriteComponent({
              src: "/weapons/projectiles/slash.png",
              size: { w: 64, h: 32 },
            }),
            offset: { x: 2, y: 2 },
            animation: {
              animations: slashAnimation,
              currentAnimation: "slash" as SlashAnimation,
              frameSize: { w: 64, h: 32 },
              frameRate: 8,
              loop: false,
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
