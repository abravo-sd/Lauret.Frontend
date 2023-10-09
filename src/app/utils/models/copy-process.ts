import { Deserializable } from '../interfaces';

export class CopyProcess implements Deserializable {
  accreditation: string;
  processOrigin: number;
  processDestination: number;
  careerOrigin: string;
  careerDestination: string;

  constructor() {
    this.accreditation = null;
    this.processOrigin = null;
    this.processDestination = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class CopiadoResult implements Deserializable {
  procesados: number;
  exitosos: number;
  errores: number;
  clavesError: string[];

  constructor() {
    this.procesados = null;
    this.exitosos = null;
    this.errores = null;
    this.clavesError = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
