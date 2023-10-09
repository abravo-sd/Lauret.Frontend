import { Deserializable } from '../interfaces';

export class EjecucionAutoevaluacionDTO {
  ejecucionAutoevaluacionId: number;
  componenteId: string;
  elementoEvaluacionId: number;
  puntajeAnterioir: number;
  ountajeFinal: number;
  escenario: string;
  valor: number;
  descripcion: string;
  seleccion: boolean;

  constructor() {
    this.ejecucionAutoevaluacionId = null;
    this.componenteId = null;
    this.elementoEvaluacionId = null;
    this.puntajeAnterioir = null;
    this.ountajeFinal = null;
    this.escenario = null;
    this.valor = null;
    this.descripcion = null;
    this.seleccion = null;
  }
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
