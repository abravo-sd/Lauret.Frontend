import { Deserializable } from '../interfaces';

export class FiltersModal implements Deserializable {
  acreditadoraProcesoId: number;
  carreraId: string;
  processId: string;
  constructor() {
    this.acreditadoraProcesoId = null;
    this.carreraId = null;
    this.processId = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
