import { Deserializable } from '../interfaces';

export class ReporteDTO implements Deserializable {
  acreditadoraProcesoId: string;
  ciclo: string[];
  carrera: string[];
  capitulo: string[];
  criterio: string[];
  sede: string[];
  campus: string[];
  esEntregado: boolean;

  constructor() {
    this.acreditadoraProcesoId = null;
    this.ciclo = [];
    this.carrera = [];
    this.capitulo = [];
    this.criterio = [];
    this.sede = [];
    this.campus = [];
    this.esEntregado = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
