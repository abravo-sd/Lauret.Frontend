import { Deserializable } from '../interfaces';

export class CapituloDTOV1 implements Deserializable {
    acreditadoraProcesoId: number;
    capituloId: string;
    nombre: string;
    descripcion: string;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string

    constructor() {
        this.acreditadoraProcesoId = 0;
        this.capituloId = null;
        this.nombre = null;
        this.descripcion = null;
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
