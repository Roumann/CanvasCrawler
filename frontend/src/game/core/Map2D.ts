import { SpriteComponent } from "../components/Sprite";

export type IMap2D = {
  bgPath: string;
};

export class Map2D {
  background: SpriteComponent;

  constructor({ bgPath }: IMap2D) {
    this.background = new SpriteComponent({ src: bgPath });
  }
}

export type TiledWall = {
  heigth: number;
  id: number;
  name: string;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
};
