import { Deserializable } from '../interfaces';

export class UsuarioActiveDirectory implements Deserializable {
    correo: string;
    nombre: string;
    apellidos: string;

    constructor() {
        this.correo = null;
        this.nombre = null;
        this.apellidos = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
