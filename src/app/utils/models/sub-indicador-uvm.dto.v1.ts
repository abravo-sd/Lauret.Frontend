import { Deserializable } from '../interfaces';

export class SubIndicadorUVMDTOV1 implements Deserializable {
    id: string;
    clave: string;
    nombreSubIndicadorUvm: string;
    indicadorUvmId: string | number;
    nombreIndicadorUvm: string;
    componenteUvmId: string | number;
    nombreComponenteUvm: string;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.id = null;
        this.clave = null;
        this.nombreSubIndicadorUvm = null;
        this.indicadorUvmId = 0;
        this.nombreIndicadorUvm = null;
        this.componenteUvmId = 0;
        this.nombreComponenteUvm = null;
        this.activo = null;
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
