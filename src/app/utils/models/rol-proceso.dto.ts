import { Deserializable } from '../interfaces';
import { Vista } from './vista';

export class RolProcesoDTO implements Deserializable {
  acreditadoraProcesoId: number;
  rolProcesoId: string;
  nombre: string;
  vistaInicial: string;
  vistaInicialNombre: string;
  vistas: Vista[];

  constructor() {
    this.acreditadoraProcesoId = 0;
    this.rolProcesoId = null;
    this.nombre = null;
    this.vistaInicial = null;
    this.vistaInicialNombre = null;
    this.vistas = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
