import { Deserializable } from '../interfaces';

export class CopiadoRequest implements Deserializable {
  origen: number;
  destino: number;
  carreraOrigen?: string;
  carreraDestino?: string;

  constructor() {
    this.origen = null;
    this.destino = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
