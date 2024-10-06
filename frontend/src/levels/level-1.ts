import { gemAnimations, GemAnimations } from "../animations/gem";
import { HeroAnimations, heroAnimations } from "../animations/hero";
import { GameObject } from "../game/game-object";
import { Player } from "../game/player";
import { withGrid } from "../game/utils";
import { Vector2 } from "../game/vector2";
import { World } from "../game/world";

export const level1 = {
  name: "level 1",
  map: new World({ src: "/maps/map_1.png" }),
  gameObjects: {
    player: new Player({
      position: new Vector2(160, 160),
      size: new Vector2(32, 32),
    }),
    enemy: new GameObject({
      position: new Vector2(70, 20),
      size: new Vector2(32, 32),
      src: "/characters/char_1.png",
      animationMap: heroAnimations,
      currentAnimation: "walk-up" as HeroAnimations,
    }),
    gem: new GameObject({
      position: new Vector2(withGrid(15), withGrid(25)),
      size: new Vector2(32, 32),
      src: "/items/gem.png",
      animationMap: gemAnimations,
      currentAnimation: "shine" as GemAnimations,
    }),
  },
};
