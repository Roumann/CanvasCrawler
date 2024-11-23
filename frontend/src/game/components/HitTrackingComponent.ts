export class HitTrackingComponent {
  hitEnemies: Set<number>;

  constructor() {
    this.hitEnemies = new Set();
  }
  hasHit(enemyId: number): boolean {
    return this.hitEnemies.has(enemyId);
  }

  addHit(enemyId: number) {
    this.hitEnemies.add(enemyId);
  }

  remove(enemyId: number) {
    this.hitEnemies.delete(enemyId);
  }

  reset() {
    this.hitEnemies.clear();
  }
}
