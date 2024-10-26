import { EntityManager } from "../managers/EntityManager";

export abstract class System {
  protected entityManager: EntityManager | null = null;

  setEntityManager(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  abstract update(...args: any[]): void;
}
