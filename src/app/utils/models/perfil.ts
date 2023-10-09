import { Deserializable } from '../interfaces';
import { Vista } from './vista';

export class Perfil implements Deserializable {
    id: string;
    nombre: string;
    correo: string;
    perfil: string;
    campus: string;
    region: string;
    areaResponsable: string;
    activo: boolean;
    esAdmin: boolean;
    vistaInicial: Vista;
    vistas: Vista[];

    constructor() {
        this.id = null;
        this.nombre = null;
        this.correo = null;
        this.perfil = null;
        this.campus = null;
        this.region = null;
        this.areaResponsable = null;
        this.activo = null;
        this.esAdmin = null;
        this.vistaInicial = null;
        this.vistas = [];
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        if (this.vistaInicial) {
            this.vistaInicial = new Vista().deserialize(this.vistaInicial);
        }

        if (this.vistas) {
            this.vistas = this.vistas.map((item) => new Vista().deserialize(item));
        }
        return this;
    }
}
