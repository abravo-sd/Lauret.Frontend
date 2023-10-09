import { Deserializable } from '../interfaces';
import { AreaCorporativaSubAreaDTO } from './area-corporativ-sub-area.dto';

export class AreaCorporativaDTO implements Deserializable {
  areaCorporativaId: string;
  nombre: string;
  activo: boolean;
  areaCorporativaSubAreas: AreaCorporativaSubAreaDTO[];

  constructor() {
    this.areaCorporativaId = null;
    this.nombre = null;
    this.areaCorporativaSubAreas = [];
    this.activo = null;
  }

  getareaCorporativaSubaAreaListString(): string {
    return this.areaCorporativaSubAreas.map((i) => `${i.nombre}`).join(', ');
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
