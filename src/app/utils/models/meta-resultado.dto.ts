import { Deserializable } from '../interfaces';

import { NivelModalidadDTO } from './nivel-modalidad.dto';

export class MetaResultadosDTO implements Deserializable {
  metasResultadoId: number;
  anioId: number;
  cicloId: string;
  regionId: string;
  nivelModalidades: NivelModalidadDTO[];
  campusId: string;
  areaResponsableId: Number;
  inicio: string;
  fin: string;
  etapa: string;
  avance: string;
  activo: boolean;

  constructor() {
    this.metasResultadoId = null;
    this.anioId = null;
    this.cicloId = null;
    this.regionId = null;
    this.nivelModalidades = null;
    this.campusId = null;
    this.areaResponsableId = null;
    this.inicio = null;
    this.fin = null;
    this.etapa = null;
    this.avance = null;
    this.activo = null;
  }
  getLevelModalityListString(): string {
    return this.nivelModalidades.map((i) => `${i.nivel}/${i.modalidad}`).join(', ');
  }
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
