import { Scene } from "../core";
import { System } from "../core/System";
import { EntityManager } from "./EntityManager";

export class SystemManager {
  systems: System[];
  nextId: number;

  constructor(private scene: Scene) {
    this.systems = [];
    this.nextId = 1;
  }

  update(deltaTime: number) {
    this.systems.forEach((system) => {
      system.update(deltaTime);
    });
  }

  addSystem(system: System) {
    system.setScene(this.scene);
    this.systems.push(system);
  }

  // TODO do this for all functions in CORE ECS
  /**
   * Adds new system to current scenes system manager.
   *
   * **Order of systems is important!**
   *
   * Systems are executed one by one in the order they are added.
   *
   * **Always add your render system last!**
   *
   * @param systems - Array of systems to add.
   */

  addSystems(systems: System[]) {
    systems.forEach((system) => {
      this.addSystem(system);
    });
  }
}
