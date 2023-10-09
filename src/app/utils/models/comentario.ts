import { Deserializable } from '../interfaces';

export class ComentarioDTO implements Deserializable {
  comentarioSeguimientoId: number;
  acreditadoraProcesoId: number;
  AcreditadoraProcesoNombre: string;

  carreraId: string;
  carreraNombre: string;

  orden: number;

  titulo: string;
  contenido: string;

  constructor() {
    this.comentarioSeguimientoId = 0;
    this.acreditadoraProcesoId = 0;
    this.carreraId = null;
    this.carreraNombre = null;
    this.orden = 0;
    this.titulo = null;
    this.contenido = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
