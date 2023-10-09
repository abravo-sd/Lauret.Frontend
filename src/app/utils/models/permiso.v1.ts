import { Deserializable } from '../interfaces';

export class PermisoV1 implements Deserializable {
    id: string | number;
    nombre: string;
    descripcion: string;

    constructor() {
        this.id = null;
        this.nombre = null;
        this.descripcion = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
