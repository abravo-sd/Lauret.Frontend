import { Deserializable } from '../interfaces';

export class IndicadorSiacDTOV1 implements Deserializable {
    id: string;
    clave: string;
    nombre: string;
    descripcion: string;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string

    constructor() {
        this.id = null;
        this.clave = null;
        this.nombre = null;
        this.descripcion = null;
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
