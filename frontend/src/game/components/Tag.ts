export type TTagComponent = {
  tag: string;
};

export class TagComponent {
  tag: string;

  constructor({ tag }: TTagComponent) {
    this.tag = tag;
  }
}
