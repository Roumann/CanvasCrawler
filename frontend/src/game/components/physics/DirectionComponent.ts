export type TDirectionComponent = {
  direction?: "up" | "down" | "left" | "right" | null;
};

export class DirectionComponent {
  direction: "up" | "down" | "left" | "right" | null;

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
