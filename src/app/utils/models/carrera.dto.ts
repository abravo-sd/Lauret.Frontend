import { Deserializable } from '../interfaces';

export class CarreraDTO implements Deserializable {
    carreraId: string;
    nombre: string;
    plan: string;
    activo: boolean;

    constructor() {
        this.carreraId = null;
        this.nombre = null;
        this.plan = null;
        this.activo = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
