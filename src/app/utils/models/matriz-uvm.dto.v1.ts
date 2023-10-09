import { IndicadorUVMDTO } from './indicador-uvm.dto';
import { IndicadorUVMDTOV1 } from './indicador-uvm.dto.v1';
import { Deserializable } from '../interfaces';
import { SubIndicadorUVMDTO } from './sub-indicador-uvm.dto';
import { SubIndicadorUVMDTOV1 } from './sub-indicador-uvm.dto.v1';

export class MatrizUvmDTOV1 implements Deserializable {
    id: string;
    clave: string;
    componenteUvmId: string;
    ComponenteUvm: string;
    descripcionComponenteUvm: string;
    indicadorUvms: IndicadorUVMDTOV1[];
    subIndicadorUvms: SubIndicadorUVMDTOV1[];
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.id = null;
        this.clave = null;
        this.componenteUvmId = null;
        this.ComponenteUvm = null;
        this.descripcionComponenteUvm = null;
        this.indicadorUvms = [];
        this.subIndicadorUvms = [];
        this.activo = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null
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
