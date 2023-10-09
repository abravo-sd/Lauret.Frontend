import { Deserializable } from '../interfaces';

export class Anio implements Deserializable {
    anioId: number;
    anio: number;

    constructor() {
        this.anioId = null;
        this.anio = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
