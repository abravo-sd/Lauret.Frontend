import { Deserializable } from '../interfaces';
import { ModalTitle } from './area-responsable.dto';
/*
export enum ModalTitle {
  GENERICA = 'Genérica',
  CAMPUS = 'Campus',
} */

export class ConfNivelAreaResponsableDTO implements Deserializable {
  configuracionGeneralId: number;
  nivelModalidadId: string;
  areaResponsableId: number;
  anio: number;
  cicloId: string;
  generica: Boolean;
  areaResponsableNombre: string;
  nivelModalidadNombre: string;
  activo: boolean;

  constructor() {
    this.configuracionGeneralId = 0;
    this.nivelModalidadId = null;
    this.areaResponsableId = 0;
    this.anio = null;
    this.cicloId = null;
    this.generica = null;
    this.activo = null;
    this.areaResponsableNombre = null;
    this.nivelModalidadNombre = null;
  }

  getTypeArea(): string {
    return this.generica ? ModalTitle.GENERICA : ModalTitle.CAMPUS;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
