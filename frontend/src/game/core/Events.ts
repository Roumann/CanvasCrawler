export class EventDispatcher {
  events: string[] = [];

  constructor() {
    this.events = [];
  }
  add(name: string) {
    this.events.push(name);
  }
}
