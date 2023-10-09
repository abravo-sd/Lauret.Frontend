import { Deserializable } from '../interfaces';

export class UserSession implements Deserializable {
  id: string;
  nombre: string;
  correo: string;
  activo: boolean;
  esAdmin: boolean;

  constructor() {
    this.id = null;
    this.nombre = null;
    this.correo = null;
    this.activo = null;
    this.esAdmin = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
