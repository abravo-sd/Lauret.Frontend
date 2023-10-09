import { Deserializable } from '../interfaces';

export class CapituloDTO implements Deserializable {
    acreditadoraProcesoId: number;
    capituloId: string;
    nombre: string;
    descripcion: string;

    constructor() {
        this.acreditadoraProcesoId = 0;
        this.capituloId = null;
        this.nombre = null;
        this.descripcion = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
