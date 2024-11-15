import { PositionComponent } from "../base/Position";
import { SpriteComponent } from "../rendering/Sprite";

export type TSceneBackground = {
  background: {
    src: string;
    size: { w: number; h: number };
  };
};

export class SceneBackground {
  background: SpriteComponent;
  position: PositionComponent;

  constructor({ background }: TSceneBackground) {
    this.position = new PositionComponent({ x: 0, y: 0 });
    this.background = new SpriteComponent(background);
  }
}
