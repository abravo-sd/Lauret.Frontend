import { Deserializable } from '../interfaces';

export class UsuarioDTOV1 implements Deserializable {
  idUsuario: string | number;
  nombre: string;
  apellidos: string;
  correo: string;
  activo: boolean;
  esAdmin: boolean;
  region: string;
  campus: string;
  perfil: string;
  areasResponsable: string;
  // regiones: [];
  // campus: [];
  // nivelesModalidad: [];
  // areasResponsables: [];
  // areasCorporativas: [];

  constructor() {
    this.idUsuario = null;
    this.nombre = null;
    this.correo = null;
    this.activo = null;
    this.esAdmin = null;
  }

  // getRegionsString(): string {
  //     return this.regiones.map((i: any) => `${i.region}`).join(', ');
  // }

  // getCampusesListString(): string {
  //     return this.campus.map((i: any) => `${i.campus}`).join(', ');
  // }

  // getLevelModalityListString(): string {
  //     return this.nivelesModalidad.map((i: any) => `${i.nivel}/${i.modalidad}`).join(', ');
  // }

  // getAreaResponsablesListString(): string {
  //     return this.areasResponsables.map((i: any) => `${i.areaResponsable}`).join(', ');
  // }

  // getCorporateAreaListtString(): string {
  //     return this.areasCorporativas.map((i: any) => `${i.areaCorporativa}`).join(', ');
  // }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
