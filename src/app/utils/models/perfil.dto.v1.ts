import { Deserializable } from '../interfaces';
import { PerfilVistaDTOV1 } from './perfil-vista.dto.v1';

export class PerfilDTOV1 implements Deserializable {
    id: string | number;
    clave: string;
    nombre: string;
    activo: boolean;
    vistaId: string;
    vista: String;
    relPerfilvista: PerfilVistaDTOV1[];
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string

    constructor() {
        this.id = null;
        this.clave = null;
        this.nombre = null;
        this.activo = false;
        this.vistaId = null;
        this.vista = null;
        this.relPerfilvista = [];
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
