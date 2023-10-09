import { Deserializable } from '../interfaces';

export class Permiso implements Deserializable {
  moduloId: number;
  claveModulo: string;
  descModulo: string;
  permiso: string;
  modificar: boolean;

  constructor() {
    this.moduloId = null;
    this.claveModulo = null;
    this.descModulo = null;
    this.permiso = null;
    this.modificar = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
