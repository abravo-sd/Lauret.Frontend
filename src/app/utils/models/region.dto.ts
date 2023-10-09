import { Deserializable } from '../interfaces';

export class RegionDTO implements Deserializable {
  regionId: string;
  nombre: string;
  activo: boolean;
  direccionRegional: string;

  constructor() {
    this.regionId = null;
    this.nombre = null;
    this.activo = null;
    this.direccionRegional = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
