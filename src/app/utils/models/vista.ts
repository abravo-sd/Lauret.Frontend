import { Deserializable } from '../interfaces';

export class Vista implements Deserializable {
  vistaId: string;
  vistaNombre: string;
  nombre: string;
  tipoAcceso: TipoAcceso[];
  //tipoAccesoIds: string[];

  constructor() {
    this.vistaId = null;
    this.vistaNombre = null;
    this.nombre = null;
    this.tipoAcceso = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class TipoAcceso {
  id: number;
  nombre: string;
  descripcion: string;
}
