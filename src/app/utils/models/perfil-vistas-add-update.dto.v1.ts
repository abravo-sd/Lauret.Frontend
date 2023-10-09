import { Deserializable } from '../interfaces';

export class PerfilVistasAddUpdateDTOV1 implements Deserializable {
    id: string | number;
    tipoAcceso: (string | number)[];

    constructor() {
        this.id = null;
        this.tipoAcceso = [];
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}