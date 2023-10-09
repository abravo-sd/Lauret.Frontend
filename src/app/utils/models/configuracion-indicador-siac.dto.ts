import { Deserializable } from '../interfaces';
import { MatrizUvmDTO } from './matriz-uvm.dto';

export class ConfiguracionIndicadorSiacDTO implements Deserializable {
  configuracionIndicadorSiacId: number;
  cicloId: string;
  anio: number;
  componenteId: string;
  componenteNombre: string;
  nivelModalidadId: string;
  nivelModalidadNombre: string;
  areaResponsableId: number;
  areaResponsableNombre: string;
  catalogoIndicadorSiacId: string;
  nombreIndicadorSiacId: string;
  descripcionIndicadorSiacId: string;
  matrizUvmId: number;
  matrizUvm: MatrizUvmDTO;
  nombreComponenteUvm: string;
  descripcionComponenteUvm: string;
  indicadorUvm: number;
  subIndicadorUvm: string;
  generica: boolean;
  activo: boolean;

  constructor() {
    this.configuracionIndicadorSiacId = null;
    this.cicloId = null;
    this.anio = null;
    this.componenteId = null;
    this.componenteNombre = null;
    this.nivelModalidadId = null;
    this.nivelModalidadNombre = null;
    this.areaResponsableId = null;
    this.areaResponsableNombre = null;
    this.catalogoIndicadorSiacId = null;
    this.nombreIndicadorSiacId = null;
    this.descripcionIndicadorSiacId = null;
    this.matrizUvmId = null;
    this.matrizUvm = null;
    this.nombreComponenteUvm = null;
    this.descripcionComponenteUvm = null;
    this.indicadorUvm = null;
    this.subIndicadorUvm = null;
    this.generica = null;
    this.activo = null;
  }

  getIndicatorUvmListString(): string {
    return this.matrizUvm.indicadorUvms.map((i) => `${i.nombreIndicadorUvm}`).join(', ');
  }
  getSubIndicatorUvmListString(): string {
    return this.matrizUvm.subIndicadorUvms.map((i) => `${i.nombreSubIndicadorUvm}`).join(', ');
  }

  getTypeArea(): string {
    if (this.generica == true) {
      return 'Genérica';
    } else {
      return 'Campus';
    }
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
