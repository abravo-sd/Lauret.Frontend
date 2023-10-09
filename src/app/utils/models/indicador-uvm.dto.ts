import { Deserializable } from '../interfaces';

export class IndicadorUVMDTO implements Deserializable {
  indicadorUvmId: number;
  nombreIndicadorUvm: string;
  activo: boolean;

  constructor() {
    this.indicadorUvmId = 0;
    this.nombreIndicadorUvm = null;
    this.activo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
