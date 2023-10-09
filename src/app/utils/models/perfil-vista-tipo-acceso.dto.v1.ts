import { Deserializable } from '../interfaces';

export class PerfilVistaTipoAccesoDTOV1 implements Deserializable {
    id: string | number;
    perfilVistaId: string | number;
    perfilVista: string;
    catTipoAccesoId: string | number;
    catTipoAcceso: string;

    constructor() {
        this.id = null;
        this.perfilVistaId = null;
        this.perfilVista = null;
        this.catTipoAccesoId = null;
        this.catTipoAcceso = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
