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

  getEntitiesByTag(tag: string) {
    return this.entities.filter((entity) => {
      const tagComponent = entity.getComponent("TagComponent");
      return tagComponent && tagComponent.tag === tag;
    });
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

// TODO like this
// const query = world.createQuery({
//   any: [A, B], // exclude any entity that does not have at least one of A OR B.
//   all: [C, D], // exclude entities that don't have both C AND D
//   none: [E, F], // exclude entities that have E OR F
// });

// If Entity doesnt have one the passed in values it gets exluded. Entitis with all passed in values and extra will be also returned
// function exludeIfNotOneOf() {
//   const keep = ["Position", "Size"];
//   let res = [];

//   for (let i = 0; i < entitis.length; i++) {
//     for (let k = 0; k < keep.length; k++) {
//       if (entitis[i].has(keep[k])) {
//         res.push(entitis[i]);
//       }
//     }
//   }

//   return res;
// }

// If Entity doesnt have one the passed in values it gets exluded. Entitis with all passed in values and extra will be also returned
// function test() {
//   const keep = ["Position", "Size"];
//   const exclude = ["Position"];
//   let res = [];

//   for (let i = 0; i < entitis.length; i++) {
//     for (let k = 0; k < keep.length; k++) {
//       if (entitis[i].has(exclude[k])) {
//         break;
//       }
//       if (entitis[i].has(keep[k])) {
//         res.push(entitis[i]);
//       }
//     }
//   }

//   return res;
// }
