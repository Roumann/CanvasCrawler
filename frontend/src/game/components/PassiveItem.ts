export type TPassiveItemComponent = {
  name: string;
  description: string;
};

export class PassiveItemComponent {
  name: string;
  description: string;

  constructor({ name, description }: TPassiveItemComponent) {
    this.name = name;
    this.description = description;
  }
}
