import { Deserializable } from '../interfaces';

export class TipoAccesoDTO implements Deserializable {
    tipoAccesoId: string;
    nombre: string;

    constructor() {
        this.tipoAccesoId = null;
        this.nombre = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
