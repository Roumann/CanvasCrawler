import { GameObject } from "../game-object";
import { MapObject } from "../../../public/maps/map_3";

export class CollisionSystem {
  object: GameObject | null = null;
  walls: any;

  constructor(object: GameObject) {
    this.object = object;
    this.walls = MapObject.layers[1].data;
  }

  check() {
    if (!this.object) return;

    const startRow = Math.floor(this.object.position.y / 16) - 1;
    const endRow =
      Math.floor((this.object.position.y + this.object.size.y) / 16) + 1;
    const startCol = Math.floor(this.object.position.x / 16) - 1;
    const endCol =
      Math.floor((this.object.position.x + this.object.size.x) / 16) + 1;

    for (
      let eachRow = Math.max(0, startRow);
      eachRow <= Math.min(99, endRow);
      eachRow++
    ) {
      for (
        let eachCol = Math.max(0, startCol);
        eachCol <= Math.min(99, endCol);
        eachCol++
      ) {
        let arrayIndex = eachRow * 100 + eachCol;

        if (this.walls[arrayIndex] !== 0) {
          let wall = {
            x: eachCol * 16,
            y: eachRow * 16,
            width: 16,
            height: 16,
          };

          if (
            this.object.position.x < wall.x + wall.width &&
            this.object.position.x + this.object.size.x > wall.x &&
            this.object.position.y < wall.y + wall.height &&
            this.object.position.y + this.object.size.y > wall.y
          ) {
            const overlapX =
              this.object.position.x +
              this.object.size.x / 2 -
              (wall.x + wall.width / 2);
            const overlapY =
              this.object.position.y +
              this.object.size.y / 2 -
              (wall.y + wall.height / 2);

            if (Math.abs(overlapX) > Math.abs(overlapY)) {
              if (overlapX > 0) {
                this.object.position.x = wall.x + wall.width;
              } else {
                this.object.position.x = wall.x - this.object.size.x;
              }
            } else {
              if (overlapY > 0) {
                this.object.position.y = wall.y + wall.height;
              } else {
                this.object.position.y = wall.y - this.object.size.y;
              }
            }
          }
        }
      }
    }
  }
}
