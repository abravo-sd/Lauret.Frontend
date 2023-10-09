import { Deserializable } from '../interfaces';

export class SubareaDTO implements Deserializable {
  subareaId: string;
  nombre: string;
  activo: boolean;
  nivelOrganizacionalId: string;
  nivelOrganizacionalNombre: string;
  nivelAtencionId: string;
  nivelAtencionNombre: string;

  constructor() {
    this.subareaId = null;
    this.nombre = null;
    this.activo = null;
    this.nivelOrganizacionalId = null;
    this.nivelOrganizacionalNombre = null;
    this.nivelAtencionId = null;
    this.nivelAtencionNombre = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
