import { Deserializable } from '../interfaces';

export class AreaCorporativaSubAreaDTO implements Deserializable {
    areaCoporativaSubArea: number;
    nombre: string;

    constructor() {
        this.areaCoporativaSubArea = 0;
        this.nombre = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
