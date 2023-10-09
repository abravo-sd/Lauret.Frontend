import { Deserializable } from '../interfaces';
import { PermisoV1 } from './permiso.v1';

export class VistaV1 implements Deserializable {
    vistaId: string | number;
    nombre: string;
    tipoVista: string;
    permisos: PermisoV1[];

    constructor() {
        this.vistaId = null;
        this.nombre = null;
        this.tipoVista = null;
        this.permisos = [];
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
