import { Deserializable } from '../interfaces';

export class NivelOrganizacionalDTO implements Deserializable {
  nivelOrganizacionalId: string;
  nombre: string;
  activo: boolean;

  constructor() {
    this.nivelOrganizacionalId = null;
    this.nombre = null;
    this.activo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
