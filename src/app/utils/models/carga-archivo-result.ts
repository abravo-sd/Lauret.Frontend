import { Deserializable } from '../interfaces';
import { CargaArchivoError } from './carga-archivo-error';

export class CargaArchivoResult implements Deserializable {
  procesados: number;
  exitosos: number;
  errores: number;
  clavesError: CargaArchivoError[];

  constructor() {
    this.procesados = null;
    this.exitosos = null;
    this.errores = null;
    this.clavesError = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    if (this.clavesError) {
      this.clavesError = this.clavesError.map((item) => new CargaArchivoError().deserialize(item));
    }
    return this;
  }
}
