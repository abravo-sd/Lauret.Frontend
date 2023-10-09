import { Deserializable } from '../interfaces';

export class RegistroElementoEvaluacionArchivoDTO implements Deserializable {
  registroElementoEvaluacionArchivoId: number;
  elementoEvaluacionId: number;
  nombreArchivo: string;
  mime: string;

  constructor() {
    this.registroElementoEvaluacionArchivoId = 0;
    this.elementoEvaluacionId = null;
    this.nombreArchivo = null;
    this.mime = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
