import { Deserializable } from '../interfaces';

export class NivelModalidadDTO implements Deserializable {
  nivelModalidadId: string;
  nivel: string;
  modalidad: string;
  activo: boolean;

  constructor() {
    this.nivelModalidadId = null;
    this.nivel = null;
    this.modalidad = null;
    this.activo = null;
  }

  getLevelModality(): string {
    return `${this.nivel}/${this.modalidad}`;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
