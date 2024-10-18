import { SpriteComponent } from "../components/Sprite";

export type IMap2D = {
  bgPath: string;
  walls?: TiledWall[];
};

export class Map2D {
  background: SpriteComponent;
  walls: TiledWall[];

  constructor({ bgPath, walls }: IMap2D) {
    this.background = new SpriteComponent({ src: bgPath });
    this.walls = walls ?? [];
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
