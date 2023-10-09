import { Deserializable } from '../interfaces';

export class IndicadorUVMDTOV1 implements Deserializable {
    id: string;
    nombreIndicadorUvm: string;
    activo: boolean;
    componenteUvmId: string | number;
    nombreComponenteUvm: string;
    descripcionComponenteUvm: string;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.id = null;
        this.nombreIndicadorUvm = null;
        this.activo = null;
        this.componenteUvmId = 0;
        this.nombreComponenteUvm = null;
        this.descripcionComponenteUvm = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
