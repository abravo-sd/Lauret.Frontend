import { Serializer } from '@angular/compiler';
import { Deserializable } from '../interfaces';
import { NivelModalidadDTO } from './nivel-modalidad.dto';
import { NivelModalidadDTOV1 } from './nivel-modalidad.dto.v1';

export enum ModalTitleV1 {
  GENERICA = 'Genérica',
  CAMPUS = 'Campus',
}

export class AreaResponsableDTOV1 implements Deserializable {
  id: string;
  clave: string;
  nombre: string;
  idAreaResponsablePadre: string;
  areaResponsablePadre: string;
  generica: boolean;
  consolidacion: boolean;
  activo: boolean;
  nivelModalidades: NivelModalidadDTOV1[];
  fechaCreacion: Date | string;
  usuarioCreacion: string;
  fechaModificacion: Date | string;
  usuarioModificacion: string;
  catDependenciaAreaId: number;
  dependenciaArea: string;
  nivelesModalidad: number[] = [];
  nivelModalidad: string = null;
  nivelModalidadIds: string = null;

  constructor() {
    this.id = null;
    this.catDependenciaAreaId = null;
    this.clave = null;
    this.nombre = null;
    this.idAreaResponsablePadre = null;
    this.areaResponsablePadre = null;
    this.generica = null;
    this.consolidacion = null;
    this.activo = null;
    this.nivelModalidades = [];
    this.fechaCreacion = null;
    this.usuarioCreacion = null;
    this.fechaModificacion = null;
    this.usuarioModificacion = null;
  }

  getListNivelModalidad(): string {
    return this.nivelModalidades.map((x) => x.modalidad).join(',');
  }

  getTypeArea(): string {
    return this.generica ? ModalTitleV1.GENERICA : ModalTitleV1.CAMPUS;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
