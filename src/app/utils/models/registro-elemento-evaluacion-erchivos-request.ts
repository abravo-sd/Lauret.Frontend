import { Deserializable } from '../interfaces';
import { RegistroElementoEvaluacionArchivoDTO } from './registro-elemento-evaluacion-archivo.dto';

export class RegistroElementoEvaluacionArchivosRequest implements Deserializable {
  nuevos: RegistroElementoEvaluacionArchivoDTO[];
  borrar: number[];
  constructor() {
    this.nuevos = [];
    this.borrar = [];
  }

  deserialize(input: any): this {
    if (this.nuevos) {
      this.nuevos = this.nuevos.map((item) => new RegistroElementoEvaluacionArchivoDTO().deserialize(item));
    }

    Object.assign(this, input);
    return this;
  }
}
