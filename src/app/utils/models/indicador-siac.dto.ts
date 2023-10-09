import { Deserializable } from '../interfaces';

export class IndicadorSiacDTO implements Deserializable {
    indicadorSiacId: string;
    nombre: string;
    descripcion: string;
    activo: boolean;

    constructor() {
        this.indicadorSiacId = null;
        this.nombre = null;
        this.descripcion = null;
        this.activo = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
