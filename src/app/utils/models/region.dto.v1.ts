import { Deserializable } from '../interfaces';

export class RegionDTOV1 implements Deserializable {
  id: string;
  clave: string;
  regionId: string;
  nombre: string;
  directorRegional: string;
  activo: boolean;
  fechaCreacion: Date | string;
  usuarioCreacion: string;
  fechaModificacion: Date | string;
  usuarioModificacion: string;
  usuarioDirectorRegionalId: number;

  constructor() {
    this.id = null;
    this.clave = null;
    this.regionId = null;
    this.nombre = null;
    this.directorRegional = null;
    this.activo = null;
    this.fechaCreacion = null;
    this.usuarioCreacion = null;
    this.fechaModificacion = null;
    this.usuarioModificacion = null;
    this.usuarioDirectorRegionalId = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
