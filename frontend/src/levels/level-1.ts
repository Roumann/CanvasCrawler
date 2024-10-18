import { gemAnimations, GemAnimations } from "../animations/gem";
import { GameObject } from "../old-game/game-object";
import { Player } from "../old-game/player";
import { withGrid } from "../old-game/utils";
import { Vector2 } from "../old-game/vector2";
import { Map } from "../old-game/map";

export const level1 = {
  name: "level 1",
  map: new Map({ src: "/maps/map_3.png" }),
  gameObjects: {
    // T0D0 change instead of creating new add type
    //  player: { type:"Player", position: new Vector2(160, 160), size: new Vector2(32, 32) },
    player: new Player({
      position: new Vector2(96, 96),
      size: new Vector2(16, 16),
    }),
    enemy: new GameObject({
      position: new Vector2(128, 64),
      size: new Vector2(16, 16),
      src: "/characters/char_1.png",
    }),
    gem: new GameObject({
      position: new Vector2(withGrid(15), withGrid(25)),
      size: new Vector2(16, 16),
      src: "/items/gem.png",
      animationMap: gemAnimations,
      currentAnimation: "shine" as GemAnimations,
    }),
  },
};
