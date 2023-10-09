import { IndicadorUVMDTO } from './indicador-uvm.dto';
import { Deserializable } from '../interfaces';
import { SubIndicadorUVMDTO } from './sub-indicador-uvm.dto';

export class MatrizUvmDTO implements Deserializable {
  matrizUvmId: number;
  componenteUvmId: number;
  nombreComponenteUvm: string;
  descripcionComponenteUvm: string;
  indicadorUvms: IndicadorUVMDTO[];
  subIndicadorUvms: SubIndicadorUVMDTO[];
  activo: boolean;

  constructor() {
    this.matrizUvmId = 0;
    this.componenteUvmId = null;
    this.nombreComponenteUvm = null;
    this.descripcionComponenteUvm = null;
    this.indicadorUvms = [];
    this.subIndicadorUvms = [];
    this.activo = null;
  }

  getIndicatorUvmListString(): string {
    return this.indicadorUvms.map((i) => `${i.nombreIndicadorUvm}`).join(', ');
  }
  getSubIndicatorUvmListString(): string {
    return this.subIndicadorUvms.map((i) => `${i.nombreSubIndicadorUvm}`).join(', ');
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
