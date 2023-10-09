import { Deserializable } from '../interfaces';

export class MetasResultadoDTOV2 implements Deserializable {
  anioId: string;
	cicloId: string;
	proceso: string;
	institucion: string;
	region: string;
	campus:string;
  areaResponsable:string;
	nivelModalidad: string; 
	tipoArea: string;
	etapa: string;
	inicio: string;
	fin: string;
  avance: string;

  constructor() {
    this.anioId=null;
    this.cicloId=null;
    this.proceso=null;
    this.institucion=null;
    this.region=null;
    this.campus=null;
    this.areaResponsable=null;
    this.nivelModalidad=null; 
    this.tipoArea=null;
    this.etapa=null;
    this.inicio=null;
    this.fin=null;
    this.avance=null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
