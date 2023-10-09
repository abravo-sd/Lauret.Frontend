import { Deserializable } from '../interfaces';

export class ComponenteUVMDTOV1 implements Deserializable {
    id: string;
    nombreComponenteUvm: string;
    descripcionComponenteUvm: string;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string

    constructor() {
        this.id = null;
        this.nombreComponenteUvm = null;
        this.descripcionComponenteUvm = null;
        this.activo = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
