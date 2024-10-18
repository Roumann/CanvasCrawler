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

  getEntitiesWithComponentsExcl(componentNames: string[], exclude: string[]) {
    const allEntities = this.entities.filter((entity) => {
      // Check if the entity has all required components
      return componentNames.every((componentName) => {
        return entity.components.has(componentName);
      });
    });

    return allEntities.filter((entity) => {
      // Check if the entity does not have any of the excluded components
      return !exclude.some((componentName) => {
        return entity.components.has(componentName);
      });
    });
  }
}
