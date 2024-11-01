export type TDirectionComponent = {
  direction: "up" | "down" | "left" | "right";
};

export class DirectionComponent {
  direction: "up" | "down" | "left" | "right";

  constructor({ direction }: TDirectionComponent) {
    this.direction = direction ?? "right";
  }
}
