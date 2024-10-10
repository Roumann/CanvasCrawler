import { gemAnimations, GemAnimations } from "../animations/gem";
import { playerAnimations, PlayerAnimations } from "../animations/player";
import { GameObject } from "../game/game-object";
import { Player } from "../game/player";
import { withGrid } from "../game/utils";
import { Vector2 } from "../game/vector2";
import { World } from "../game/world";

export const level1 = {
  name: "level 1",
  map: new World({ src: "/maps/map_2.png" }),
  gameObjects: {
    // T0D0 change instead of creating new add type
    //  player: { type:"Player", position: new Vector2(160, 160), size: new Vector2(32, 32) },
    player: new Player({
      position: new Vector2(96, 96),
      size: new Vector2(32, 32),
    }),
    enemy: new GameObject({
      position: new Vector2(64, 64),
      size: new Vector2(32, 32),
      src: "/characters/char_1.png",
      animationMap: playerAnimations,
      currentAnimation: "walk-down" as PlayerAnimations,
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
