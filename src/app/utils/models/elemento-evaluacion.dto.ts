import { Deserializable } from '../interfaces';
import { NormativaDTO } from './normativa.dto';
import { NormativaDTOV1 } from './normativa.dto.v1';
import { RegistroElementoEvaluacionArchivoDTO } from './registro-elemento-evaluacion-archivo.dto';
import { RegistroElementoEvaluacionArchivosRequest } from './registro-elemento-evaluacion-erchivos-request';

export class ElementoEvaluacionDTO implements Deserializable {
  elementoEvaluacionId: number;
  anio: number;
  cicloId: Number;
  componenteId: string;
  componenteNombre: string;
  areaCorporativaId: string;
  areaCorporativaNombre: string;
  nivelModalidadId: string;
  nivelModalidadNombre: string;
  areaResponsableId: number;
  areaResponsableNombre: string;
  nombreEvidencia: string;
  cantidadEvidencia: number;
  descripcionEvidencia: string;
  elementoEvaluacionCatalogoId: string;
  normativas: NormativaDTOV1[];
  generica: boolean;
  nombreElementoEvaluacion: string;
  activo: boolean;
  registroElementoEvaluacionArchivosRequest: RegistroElementoEvaluacionArchivosRequest;
  registroElementoEvaluacionArchivos: RegistroElementoEvaluacionArchivoDTO[];
  constructor() {
    this.elementoEvaluacionId = null;
    this.anio = null;
    this.cicloId = null;
    this.componenteId = null;
    this.componenteNombre = null;
    this.areaCorporativaId = null;
    this.areaCorporativaNombre = null;
    this.nivelModalidadId = null;
    this.nivelModalidadNombre = null;
    this.areaResponsableId = null;
    this.areaResponsableNombre = null;
    this.nombreEvidencia = null;
    this.cantidadEvidencia = null;
    this.descripcionEvidencia = null;
    this.elementoEvaluacionCatalogoId = null;
    this.nombreElementoEvaluacion = null;
    this.generica = null;
    this.normativas = [];
    this.activo = null;
    this.registroElementoEvaluacionArchivosRequest = null;
    this.registroElementoEvaluacionArchivos = [];
  }
  getNormativeListString(): string {
    return this.normativas.map((i) => `${i.nombre}`).join(', ');
  }
  getTypeArea(): string {
    if (this.generica == true) {
      return 'Genérica';
    } else {
      return 'Campus';
    }
  }

  deserialize(input: any): this {
    if (this.registroElementoEvaluacionArchivos) {
      this.registroElementoEvaluacionArchivos = this.registroElementoEvaluacionArchivos.map((item) =>
        new RegistroElementoEvaluacionArchivoDTO().deserialize(item)
      );
    }
    Object.assign(this, input);
    return this;
  }
}
