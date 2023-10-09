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

export class UsuarioAddUpdateDTOV1 implements Deserializable {
    id: string | number;
    nombre: string;
    apellidos: string;
    correo: string;
    activo: boolean;
    catNivelRevisionId: string | number;
    tblPerfilId: string | number;
    todos: boolean;
    regiones: (string | number)[];
    campus: (string | number)[];
    nivelesModalidad: (string | number)[];
    areasResponsables: (string | number)[];
    areasCorporativas: (string | number)[];
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string


    constructor() {
        this.id = null;
        this.nombre = null;
        this.apellidos = null;
        this.correo = null;
        this.activo = false;
        this.catNivelRevisionId = null;
        this.tblPerfilId = null;
        this.todos = true;
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

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
