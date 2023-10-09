import { Deserializable } from '../interfaces';
import { VistaV1 } from './vista.v1';

export class PerfilV1 implements Deserializable {
    nombre: string;
    correo: string;
    vistas: VistaV1[];
    esAdmin: boolean;

    constructor() {
        this.nombre = null;
        this.correo = null;
        this.vistas = [];
        this.esAdmin = true;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        // if (this.vistas) {
        //     this.vistas = this.vistas.map((item) => new VistaV1().deserialize(item));
        // }
        return this;
    }
}
