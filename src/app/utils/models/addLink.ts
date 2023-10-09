import { Deserializable } from '../interfaces';

export class AddLink implements Deserializable {
  nombreLink: string;
  link: string;
  valid: boolean;
  evidenceFileId: number;

  constructor() {
    this.nombreLink = null;
    this.link = null;
    this.valid = false;
    this.evidenceFileId = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
