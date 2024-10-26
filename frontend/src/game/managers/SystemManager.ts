import { System } from "../core/System";
import { EntityManager } from "./EntityManager";

export class SystemManager {
  systems: System[];
  nextId: number;

  constructor(private entityManager: EntityManager) {
    this.systems = [];
    this.nextId = 1;
  }

  update(deltaTime: number) {
    this.systems.forEach((system) => {
      system.update(deltaTime);
    });
  }

  addSystem(system: System) {
    system.setEntityManager(this.entityManager);
    this.systems.push(system);
  }

  addSystems(systems: System[]) {
    systems.forEach((system) => {
      this.addSystem(system);
    });
  }
}
