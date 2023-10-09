import { Deserializable } from '../interfaces';
import { Evidencia } from './evidencia';
import { RegistroEvidenciaArchivo } from './registro-evidencia-archivo';

export class RegistroEvidencia implements Deserializable {
  numero: string;
  acreditadoraProcesoId: number;
  acreditadoraProcesoNombre: string;
  carreraId: string;
  carreraNombre: string;
  criterioId: string;
  evidenciaId: number;
  subareaId: string;
  subareaNombre: string;
  campusId: string;
  campusNombre: string;
  esCargada: boolean;
  esAceptada: boolean;
  evidencia: Evidencia;
  registroEvidenciaArchivos: RegistroEvidenciaArchivo[];

  constructor() {
    this.numero = null;
    this.acreditadoraProcesoId = null;
    this.acreditadoraProcesoNombre = null;
    this.carreraId = null;
    this.carreraNombre = null;
    this.criterioId = null;
    this.evidenciaId = null;
    this.subareaId = null;
    this.subareaNombre = null;
    this.campusId = null;
    this.campusNombre = null;
    this.esCargada = null;
    this.esAceptada = null;
    this.evidencia = null;
    this.registroEvidenciaArchivos = [];
  }

  deserialize(input: any): this {
    if (this.evidencia) {
      this.evidencia = new Evidencia().deserialize(this.evidencia);
    }
    if (this.registroEvidenciaArchivos) {
      this.registroEvidenciaArchivos = this.registroEvidenciaArchivos.map((item) =>
        new RegistroEvidenciaArchivo().deserialize(item)
      );
    }
    Object.assign(this, input);
    return this;
  }
}
