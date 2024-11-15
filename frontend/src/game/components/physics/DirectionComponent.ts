export type TDirectionComponent = {
  direction?: "up" | "down" | "left" | "right";
};

export class DirectionComponent {
  direction: "up" | "down" | "left" | "right";

  constructor({ direction }: TDirectionComponent) {
    this.direction = direction ?? this.getRandomDirection();
  }

  private getRandomDirection(): "up" | "down" | "left" | "right" {
    const directions: Array<"up" | "down" | "left" | "right"> = [
      "up",
      "down",
      "left",
      "right",
    ];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }
}

/**
 * Refractor to this version to use vectors
 *
 *  // 0, 1 = up
 *  // 0, -1 = down
 *  // 1, 0 = right
 *  // -1, 0 = left
 *
 * export class DirectionComponent {
 *   direction: Vector2;
 *
 *   constructor({ x = 0, y = 1 }: TDirectionComponent) {
 *     this.direction = direction;
 *   }
 *
 *   normalize(vector: Vector2): Vector2 {
 *    return math.sqrt(vector.x * vector.x + vector.y * vector.y);
 *   }
 *
 *   getRandomDirection(): Vector2 {
 *     const directions: Array<Vector2> = [
 *       new Vector2(1, 0),
 *       new Vector2(0, 1),
 *       new Vector2(-1, 0),
 *       new Vector2(0, -1),
 *     ];
 *     const randomIndex = Math.floor(Math.random() * directions.length);
 *     return directions[randomIndex];
 *   }
 *
 * }
 */
