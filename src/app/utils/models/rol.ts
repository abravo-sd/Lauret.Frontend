import { Deserializable } from '../interfaces';

export class Rol implements Deserializable {
  rolId: string;
  nombre: string;
  vistaPrincipal: number;
  modulos: number[];

  constructor() {
    this.rolId = null;
    this.nombre = null;
    this.vistaPrincipal = null;
    this.modulos = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
