import { Deserializable } from '../interfaces';
import { LibroHoja } from './libro-hoja';

export class UsuarioRolProcesoCriterio implements Deserializable {
  usuarioId: string;
  acreditadoraProcesoId: number;
  rolProcesoId: string;
  carreraId: string;
  criterioId: string;
  criterioNombre: string;
  constructor() {
    this.usuarioId = null;
    this.acreditadoraProcesoId = null;
    this.rolProcesoId = null;
    this.carreraId = null;
    this.criterioId = null;
    this.criterioNombre = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
