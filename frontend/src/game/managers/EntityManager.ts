import { Entity } from "../core/Entity";

export class EntityManager {
  entities: Entity[];
  nextId: number;

  constructor() {
    this.entities = [];
    this.nextId = 1;
  }

  createEntity() {
    const entity = new Entity(this.nextId++);
    this.entities.push(entity);
    return entity;
  }

  getEntitiesWithComponents(componentNames: string[]) {
    return this.entities.filter((entity) => {
      return componentNames.some((componentName) => {
        return entity.components.has(componentName);
      });
    });
  }
}
