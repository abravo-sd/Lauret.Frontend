import { Deserializable } from '../interfaces';

export class EscenarioDTO implements Deserializable {
  escenarioId: number;
  escalaMedicionId: number;
  valor: number;
  condicion: string;
  escenario: string;

  constructor() {
    this.escenarioId = null;
    this.escalaMedicionId = null;
    this.valor = null;
    this.condicion = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
