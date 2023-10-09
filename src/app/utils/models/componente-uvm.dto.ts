import { Deserializable } from '../interfaces';

export class ComponenteUVMDTO implements Deserializable {
  componenteUvmId: number;
  nombreComponenteUvm: string;
  descripcionComponenteUvm: string;
  activo: boolean;

  constructor() {
    this.componenteUvmId = 0;
    this.nombreComponenteUvm = null;
    this.descripcionComponenteUvm = null;
    this.activo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
