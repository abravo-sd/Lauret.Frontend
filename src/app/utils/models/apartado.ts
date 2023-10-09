import { Deserializable } from '../interfaces';

export class Apartado implements Deserializable {
  apartadoId: number;
  apartadoPadre: number;
  apartadoPadreNombre: string;
  acreditadoraProcesoId: number;
  criterioId: string;
  carreraId: string;
  titulo: string;
  especificaciones: string;
  orden: number;

  constructor() {
    this.apartadoId = 0;
    this.apartadoPadre = 0;
    this.apartadoPadreNombre = null;
    this.acreditadoraProcesoId = null;
    this.criterioId = null;
    this.carreraId = null;
    this.titulo = null;
    this.especificaciones = null;
    this.orden = 0;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
