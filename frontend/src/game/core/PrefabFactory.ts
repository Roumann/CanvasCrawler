// import { EntityManager } from "../managers/EntityManager";
// import { Entity } from "./Entity";
// import { PrefabComponent } from "./Prefab";

// export class PrefabFactory {
//   entityManager: EntityManager;

//   constructor(entityManager: EntityManager) {
//     this.entityManager = entityManager;
//   }

//   createPrefab(prefab: PrefabComponent): Entity {
//     const entity = this.entityManager.createEntity();

//     for (const component of prefab.components) {
//       entity.addPrefabComponent(new component.name(component.data));
//     }

//     return entity;
//   }

//   createPrefabs() {}
// }
