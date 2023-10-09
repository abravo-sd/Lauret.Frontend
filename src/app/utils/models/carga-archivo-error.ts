import { Deserializable } from '../interfaces';

export class CargaArchivoError implements Deserializable {
  renglon: number;
  valor: string;
  detalle: string;
  constructor() {
    this.renglon = null;
    this.valor = null;
    this.detalle = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
