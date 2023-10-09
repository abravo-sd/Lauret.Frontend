import { Deserializable } from '../interfaces';
import { RegistroEvidenciaArchivo } from './registro-evidencia-archivo';

export class RegistroEvidenciaRequest implements Deserializable {
  nuevos: RegistroEvidenciaArchivo[];
  borrar: number[];
  constructor() {
    this.nuevos = [];
    this.borrar = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
