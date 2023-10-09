import { Deserializable } from '../interfaces';
import { AreaCorporativaDTO } from './area-corporativa.dto';
import { AreaCorporativaDTOV1 } from './area-corporativa.dto.v1';
import { AreaResponsableDTO } from './area-responsable.dto';
import { CampusDTO } from './campus.dto';
import { CampusDTOV1 } from './campus.dto.v1';
import { NivelModalidadDTO } from './nivel-modalidad.dto';
import { NivelModalidadDTOV1 } from './nivel-modalidad.dto.v1';
import { RegionDTO } from './region.dto';
import { RegionDTOV1 } from './region.dto.v1';

export class CatalogoUsuarioDTOV1 implements Deserializable {
    idUsuario: string | number;
    nombre: string;
    apellidos: string;
    correo: string;
    activo: boolean;
    catNivelRevisionId: string | number;
    nivelRevision: string;
    tblPerfilId: string | number;
    perfil: string;
    todos: boolean;
    esAdmin: boolean;
    regiones: { idUsuario: string | number, usuario: string, idRegion: string | number, region: string }[];
    campus: { idUsuario: string | number, idCampus: string | number, campus: string }[];
    nivelesModalidad: { idUsuario: string | number, idNivelModalidadId: string | number, nivel: string, modalidad: string }[];
    areasResponsables: { idUsuario: string | number, idAreaResponsable: string | number, areaResponsable: string }[];
    areasCorporativas: { idUsuario: string | number, idAreaCorporativa: string | number, areaCorporativa: string }[];

    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string


    constructor() {
        this.idUsuario = null;
        this.nombre = null;
        this.apellidos = null;
        this.correo = null;
        this.activo = false;
        this.catNivelRevisionId = null;
        this.nivelRevision = null;
        this.tblPerfilId = null;
        this.perfil = null;
        this.todos = null;
        this.esAdmin = null;
        this.regiones = [];
        this.campus = [];
        this.nivelesModalidad = [];
        this.areasResponsables = [];
        this.areasCorporativas = [];
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null
    }

    getRegionsString(): string {
        return this.regiones.map((i) => `${i.region}`).join(', ');
    }

    getCampusesListString(): string {
        return this.campus.map((i) => `${i.campus}`).join(', ');
    }

    getLevelModalityListString(): string {
        return this.nivelesModalidad.map((i) => `${i.nivel}/${i.modalidad}`).join(', ');
    }

    getAreaResponsablesListString(): string {
        return this.areasResponsables.map((i) => `${i.areaResponsable}`).join(', ');
    }

    getCorporateAreaListtString(): string {
        return this.areasCorporativas.map((i) => `${i.areaCorporativa}`).join(', ');
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
