import { Deserializable } from '../interfaces';
import { CampusDTO } from './campus.dto';
import { CampusDTOV1 } from './campus.dto.v1';
import { Vista } from './vista';

export class PerfilDTO implements Deserializable {
    perfilId: number;
    nombre: string;
    activo: boolean;
    vistaInicialId: string;
    vistaInicialNombre: String;
    campuses: CampusDTOV1[];
    vistas: Vista[];

    constructor() {
        this.perfilId = null;
        this.nombre = null;
        this.activo = false;
        this.vistaInicialId = null;
        this.vistaInicialNombre = null;
        this.campuses = [];
        this.vistas = [];
    }

    getCampusString(): string {
        return this.campuses.map((i) => `${i.nombre}`).join(', ');
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
