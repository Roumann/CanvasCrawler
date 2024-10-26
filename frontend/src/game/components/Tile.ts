export type TTyleComponent = {
  type: string;
  isHarmfull?: boolean;
  damage?: number;
};

export class TileComponent {
  type: string;
  isHarmfull: boolean;
  damage: number = 10;

  constructor({ type, isHarmfull, damage }: TTyleComponent) {
    this.type = type ?? "grass";
    this.isHarmfull = isHarmfull ?? false;
    if (isHarmfull) {
      this.damage = damage ?? 10;
    }
  }
}
