import { Deserializable } from '../interfaces';

export class AcreditadoraDTO implements Deserializable {
  acreditadoraId: string;
  nombre: string;
  activo: boolean;
  acreditadoraProcesos: AcreditadoraProcesoDTO[];

  constructor() {
    this.acreditadoraId = null;
    this.nombre = null;
    this.activo = false;
    this.acreditadoraProcesos = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class AcreditadoraProcesoDTO implements Deserializable {
  acreditadoraProcesoId: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;

  constructor() {
    this.acreditadoraProcesoId = 0;
    this.nombre = null;
    this.fechaInicio = null;
    this.fechaFin = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
