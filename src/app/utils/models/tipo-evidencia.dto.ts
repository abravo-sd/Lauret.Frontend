import { Deserializable } from '../interfaces';

export class TipoEvidenciaDTO implements Deserializable {
  tipoEvidenciaId: string;
  nombre: string;
  regionId: string;
  regionNombre: string;
  activo: boolean;

  constructor() {
    this.tipoEvidenciaId = null;
    this.nombre = null;
    this.regionId = null;
    this.regionNombre = null;
    this.activo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
