import { Deserializable } from '../interfaces';

export class CarreraDTOV1 implements Deserializable {
    carreraId: string;
    nombre: string;
    plan: string;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;
    apartados: [];
    comentarioSeguimientos: [];
    criterios: [];
    evidencia: [];
    usuarioRolProcesos: [];

    constructor() {
        this.carreraId = null;
        this.nombre = null;
        this.plan = null;
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
