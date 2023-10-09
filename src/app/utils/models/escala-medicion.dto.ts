import { Deserializable } from '../interfaces';
import { EscenarioDTO } from './escenario.dto';

export class EscalaMedicionDTO implements Deserializable {
  escalaMedicionId: number;
  anio: number;
  cicloId: string;
  generica: boolean;
  areaResponsableId: number;
  nivelModalidadId: string;
  componenteId: string;
  elementoEvaluacionId: number;
  componenteNombre: string;
  nivelModalidadNombre: string;
  areaCorporativaNombre: string;
  activo: boolean;
  elementoEvaluacionNombre: string;
  escenarios: EscenarioDTO[];

  constructor() {
    this.escalaMedicionId = null;
    this.anio = null;
    this.cicloId = null;
    this.generica = null;
    this.areaResponsableId = null;
    this.nivelModalidadId = null;
    this.componenteId = null;
    this.elementoEvaluacionId = null;

    this.componenteNombre = null;
    this.nivelModalidadNombre = null;
    this.areaCorporativaNombre = null;
    this.elementoEvaluacionNombre = null;
    this.activo = null;
    this.escenarios = [];
  }

  getTypeArea(): string {
    if (this.generica == true) {
      return 'Genérica';
    } else {
      return 'Campus';
    }
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
