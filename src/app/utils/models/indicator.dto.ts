import { Deserializable } from '../interfaces';

export class IndicadorDTO implements Deserializable {
  indicadorId: string;
  nombre: string;
  descripcion: string;
  componente: string;
  indicador: string;
  subInidicador: string;
  activo: boolean;

  constructor() {
    this.indicadorId = null;
    this.nombre = null;
    this.descripcion = null;
    this.componente = null;
    this.indicador = null;
    this.subInidicador = null;
    this.activo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
