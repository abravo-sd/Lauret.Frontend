import { Deserializable } from '../interfaces';
import { PerfilVistasAddUpdateDTOV1 } from './perfil-vistas-add-update.dto.v1';

export class PerfilAddUpdateDTOV1 implements Deserializable {
    id: string | number;
    clave: string;
    nombre: string;
    apellidos: string;
    correo: string;
    activo: boolean;
    vistas: PerfilVistasAddUpdateDTOV1[];
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string

    constructor() {
        this.id = null;
        this.nombre = null;
        this.clave = null;
        this.apellidos = null;
        this.correo = null;
        this.activo = false;
        this.vistas = [];
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
