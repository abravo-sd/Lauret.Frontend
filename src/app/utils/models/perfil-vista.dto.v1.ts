import { Deserializable } from '../interfaces';
import { PerfilVistaTipoAccesoDTOV1 } from './perfil-vista-tipo-acceso.dto.v1';

export class PerfilVistaDTOV1 implements Deserializable {
    id: string | number;
    perfilId: string | number;
    perfil: string;
    vistaId: string | number;
    relPerfilvistatipoaccesos: PerfilVistaTipoAccesoDTOV1[];

    constructor() {
        this.id = null;
        this.perfilId = null;
        this.perfil = null;
        this.vistaId = null;
        this.relPerfilvistatipoaccesos = [];
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
