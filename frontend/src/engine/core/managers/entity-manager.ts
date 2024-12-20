import { TagComponent } from "../../../game/components";
import { Entity } from "../entity";

export class EntityManager {
  entities: Entity[];
  nextId: number;
  // prefabFactory: PrefabFactory;

  constructor() {
    // SYSTEM DOESNT DELET ENTITIES - ONLY MARKS THEM FOR DELETION
    // ADD ISALIVE TAG TO ENTITY AFTER RENDER IF FLAG FALSE = DELETE IT
    this.entities = []; // maybe use new Set()
    this.nextId = 1;
    // this.prefabFactory = new PrefabFactory(this);
  }

  // TODO - this could be a good way to add query to eachs system instead of
  // class SearchComponent extends Component {
  //   }
  // }
  //
  // class SearchSystem extends System {
  // query: Query<typeof SearchComponent>;
  // constructor(world: World) {
  //   this.query = world.query([TransformComponent, SearchComponent]);
  // }

  createEntity() {
    const entity = new Entity(this.nextId++);
    this.entities.push(entity);
    return entity;
  }

  // createPrefab(prefab: any) {
  //   return this.prefabFactory.createPrefab(prefab);
  // }

  getEntityByTag(tag: string): Entity {
    return this.entities.filter((entity) => {
      const tagComponent = entity.getComponent<TagComponent>("TagComponent");
      return tagComponent && tagComponent.tag === tag;
    })[0];
  }

  // 2X faster change all queries to use basic for loops
  // getEntityByTag2(tag: string): Entity | null {
  //   for (let i = 0; i < this.entities.length; i++) {
  //     const entityTag = this.entities[i].getComponent("TagComponent");
  //     if (entityTag && entityTag.tag === tag) {
  //       return this.entities[i];
  //     }
  //   }
  //   return null;
  // }

  getEntitiesByTag(tag: string): Entity[] {
    return this.entities.filter((entity) => {
      const tagComponent = entity.getComponent<TagComponent>("TagComponent");
      return tagComponent && tagComponent.tag === tag;
    });
  }

  getEntityWithComponent(componentNames: string[]): Entity {
    return this.entities.filter((entity) => {
      return componentNames.some((componentName) => {
        return entity.components.has(componentName);
      });
    })[0];
  }

  getEntitiesWithComponents(componentNames: string[]): Entity[] {
    return this.entities.filter((entity) => {
      return componentNames.some((componentName) => {
        return entity.components.has(componentName);
      });
    });
  }

  getEntitiesWithComponentsExcl(
    componentNames: string[],
    exclude: string[]
  ): Entity[] {
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

  removeEntityByTag(tag: string) {
    this.entities = this.entities.filter((entity) => {
      return (
        !entity.hasComponent("TagComponent") ||
        entity.getComponent<TagComponent>("TagComponent")?.tag !== tag
      );
    });
  }

  removeEntityById(id: number) {
    this.entities = this.entities.filter((entity) => {
      return entity.id !== id;
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
