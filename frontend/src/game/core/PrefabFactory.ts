import { EntityManager } from "../managers/EntityManager";

export class PrefabFactory {
  ComponentDictionary: Map<string, any>;
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.ComponentDictionary = new Map<string, any>();
    this.entityManager = entityManager;
  }

  createPrefab(prefab: any) {
    const entity = this.entityManager.createEntity();

    for (const componentConfig of prefab.components) {
      const ComponentClass = this.ComponentDictionary.get(componentConfig.name);
      entity.addComponent(new ComponentClass(componentConfig.properties));
    }

    return entity;
  }

  registerComponent(name: string, component: any) {
    this.ComponentDictionary.set(name, component);
  }
}
