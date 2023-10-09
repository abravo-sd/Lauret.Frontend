import { Deserializable } from '../interfaces';

export class DataFile implements Deserializable {
  name: string;
  url: string;
  data: string;
  sizeDescription: string;
  blob: Blob | null;
  file: File;

  constructor() {
    this.name = null;
    this.url = null;
    this.data = null;
    this.sizeDescription = null;
    this.blob = null;
    this.file = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
