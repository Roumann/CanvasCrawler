export class Entity {
  id: number;
  components: Map<string, any>;

  constructor(id: number) {
    this.id = id;
    this.components = new Map();
    // this.isAlive = true;
  }

  addComponent(component: any) {
    this.components.set(component.constructor.name, component);
    return this;
  }

  getComponent(componentName: string) {
    return this.components.get(componentName);
  }
}
