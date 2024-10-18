import { System } from "../core/System";

export class SystemManager {
  systems: System[];
  nextId: number;

  constructor() {
    this.systems = [];
    this.nextId = 1;
  }

  addSystem(system: System) {
    this.systems.push(system);
  }

  addSystems(systems: System[]) {
    systems.forEach((system) => {
      this.addSystem(system);
    });
  }
}
