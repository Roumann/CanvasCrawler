import { SpriteComponent } from "../rendering/Sprite";
import { TSpriteOffsetComponent } from "../rendering/SpriteOffset";

type WeaponType = "melee" | "ranged" | "aoe";

// TODO COMPLETELY REWORK HOW I INITIALIZE THIS

type TWeaponComponent = {
  info: {
    name: string;
    desc: string;
  };
  config: {
    type: WeaponType;
    damage: number;
    range: number;
    lifeTime: number; // TODO workout these three values - maybe i dont need all of them???
    cooldown: number;
    interval: number;
    collider: { w: number; h: number };
    velocity: { vx: number; vy: number };
  };
  sprite: {
    img: SpriteComponent;
    offset: TSpriteOffsetComponent;
    animation?: {
      animations: Map<string, any>;
      currAnimation: string;
      spriteGridSize: { w: number; h: number };
      frameRate: number;
      animationType: "loop" | "once" | "bounce";
    };
  };
};

export class WeaponComponent {
  info: {
    name: string;
    desc: string;
  };
  config: {
    type: WeaponType;
    damage: number;
    range: number;
    lifeTime: number;
    cooldown: number;
    interval: number;

    collider: { w: number; h: number };
    velocity: { vx: number; vy: number };
  };
  sprite: {
    img: SpriteComponent;
    offset: TSpriteOffsetComponent;
    animation?: {
      animations: Map<string, any>;
      currAnimation: string;
      spriteGridSize: { w: number; h: number };
      frameRate: number;
      animationType: "loop" | "once" | "bounce";
    };
  };

  constructor({ info, config, sprite }: TWeaponComponent) {
    this.info = info;
    this.config = config;
    this.sprite = sprite;
  }
}

interface WeaponAttributes {
  type: WeaponType;
  name: string;
  desc: string;
  damage: number;
  range: number;

  cooldown: number;
  interval: number;

  projectileCount: number;
  piercing: number;
  aoeRadius: number;
  lifetime: number;
  criticalChance: number;
  knockback: number;
  spreadAngle: number;
  speed: number;
  homing: boolean;
  bounceCount?: number;
  elementalType?: "fire" | "ice" | "lightning";
  powerUpCompatible: boolean;
  durationEffects?: string[]; // e.g., ['poison', 'burn']
}
