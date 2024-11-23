export class Entity {
  id: number;
  components: Map<string, any>;

  constructor(id: number) {
    this.id = id;
    this.components = new Map();

    // SYSTEM DOESNT DELET ENTITIES - ONLY MARKS THEM FOR DELETION
    // ADD ISALIVE TAG TO ENTITY AFTER RENDER IF FLAG FALSE = DELETE IT
    // this.isAlive = true;
  }

  //TODO fix typings...
  addComponent(component: any) {
    this.components.set(component.constructor.name, component);
    return this;
  }

  getComponent<T>(component: string): T | undefined {
    return this.components.get(component) as T | undefined;
  }

  hasComponent(component: string) {
    return this.components.has(component);
  }
}
