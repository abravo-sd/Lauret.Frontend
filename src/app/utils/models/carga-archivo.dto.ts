import { Modules } from '../enums/module';
import { Deserializable } from '../interfaces';

export class CargaArchivoDTO implements Deserializable {
  archivo: string;
  modulo: Modules;
  constructor() {
    this.archivo = null;
    this.modulo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
