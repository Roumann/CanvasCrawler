export class EventQueue {
  eventQueue: Array<{ eventName: string; callback: (data: any) => void }> = [];

  on(eventName: string, callback: (data: any) => void) {}

  emit(eventName: string, data: any) {}
}

// export class EventQueue {
//   events: Map<string, Function[]> = new Map();

//   on(eventName: string, callback: (data: any) => void) {
//     if (this.events.has(eventName)) {
//       return;
//     }
//     this.events.set(eventName, [
//       ...(this.events.get(eventName) ?? []),
//       callback,
//     ]);
//   }

//   emit(eventName: string, data: any) {
//     if (!this.events.has(eventName)) return;
//     this.events.get(eventName)?.forEach((callback) => callback(data.data));
//     this.events.delete(eventName);
//   }
// }
