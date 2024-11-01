export type TTileComponent = {
  type: string;
  isHarmful?: boolean;
  damage?: number;
};

export class TileComponent {
  type: string;
  isHarmful: boolean;
  damage: number = 10;

  constructor({ type, isHarmful: isHarmful, damage }: TTileComponent) {
    this.type = type ?? "grass";
    this.isHarmful = isHarmful ?? false;
    if (isHarmful) {
      this.damage = damage ?? 10;
    }
  }
}
