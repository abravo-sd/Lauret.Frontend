import { Deserializable } from '../interfaces';
import { CampusDTO } from './campus.dto';
import { RegistroEvidencia } from './registro-evidencia';
import { SubareaDTO } from './subarea.dto';

export class Evidencia implements Deserializable {
  numero: string;
  acreditadoraProcesoId: number;
  carreraId: string;
  carreraNombre: string;
  capituloId: string;
  criterioId: string;
  evidenciaId: number;
  areaResponsabilidadId: string;
  areaResponsabilidadNombre: string;
  tipoEvidenciaId: string;
  tipoEvidenciaNombre: string;
  sedeId: string;
  nivelOrganizacionalId: string;
  descripcion: string;
  especificaciones: string;
  fechaCompromiso: string;
  responsable: string;
  responsableNombre: string;
  responsableCorreo: string;
  registroEvidencia: RegistroEvidencia[];
  campuses: CampusDTO[];
  subareas: SubareaDTO[];
  anios: number[];
  ciclos: string[];

  constructor() {
    this.numero = null;
    this.acreditadoraProcesoId = null;
    this.carreraId = null;
    this.carreraNombre = null;
    this.capituloId = null;
    this.criterioId = null;
    this.evidenciaId = null;
    this.areaResponsabilidadId = null;
    this.areaResponsabilidadNombre = null;
    this.tipoEvidenciaId = null;
    this.tipoEvidenciaNombre = null;
    this.sedeId = null;
    this.nivelOrganizacionalId = null;
    this.descripcion = null;
    this.especificaciones = null;
    this.fechaCompromiso = null;
    this.responsable = null;
    this.responsableNombre = null;
    this.responsableCorreo = null;
    this.registroEvidencia = [];
    this.campuses = [];
    this.subareas = [];
    this.anios = [];
    this.ciclos = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
