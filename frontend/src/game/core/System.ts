import { Game } from "./Game";

export abstract class System {
  abstract update(...args: any[]): void;
}
