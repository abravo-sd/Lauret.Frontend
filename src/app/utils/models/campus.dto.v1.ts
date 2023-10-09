import { Deserializable } from '../interfaces';
import { NivelModalidadDTOV1 } from './nivel-modalidad.dto.v1';

export class CampusDTOV1 implements Deserializable {
    id: string;
    clave: string;
    nombre: string;
    idRegion: string;
    region: string;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;
    nivelModalidades: NivelModalidadDTOV1[];
    //   nivelesModalidad: number[] = [];
    nivelModalidad: string = null;
    nivelModalidadIds: string = null;

    constructor() {
        this.id = null;
        this.clave = null;
        this.nombre = null;
        this.idRegion = null;
        this.region = null;
        this.activo = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
        this.nivelModalidades = [];
    }

    getLevelModalityListString(): string {
        return this.nivelModalidades.map((i) => `${i.nivel} / ${i.modalidad}`).join(', ');
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
