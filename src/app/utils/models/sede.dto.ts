import { Deserializable } from '../interfaces';

export class SedeDTO implements Deserializable {
  sedeId: string;
  nombre: string;
  activo: boolean;

  constructor() {
    this.sedeId = null;
    this.nombre = null;
    this.activo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
