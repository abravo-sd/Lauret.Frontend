import { Deserializable } from '../interfaces';

export class NivelModalidadDTOV1 implements Deserializable {
  id: string;
  clave: string;
  nivel: string;
  activo: boolean;
  modalidad: string;
  fechaCreacion: Date | string;
  usuarioCreacion: string;
  fechaModificacion: Date | string;
  usuarioModificacion: string;

  constructor() {
    this.id = null;
    this.clave = null;
    this.nivel = null;
    this.modalidad = null;
    this.activo = null;
    this.fechaCreacion = null;
    this.usuarioCreacion = null;
    this.fechaModificacion = null;
    this.usuarioModificacion = null;
  }

  getLevelModality(): string {
    return `${this.nivel} / ${this.modalidad}`;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
