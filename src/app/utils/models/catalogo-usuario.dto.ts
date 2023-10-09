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

export class CatalogoUsuarioDTO implements Deserializable {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    activo: boolean;
    esAdmin: boolean;
    perfilId: Number;
    nivelRevision: boolean;
    areaCorporativas: AreaCorporativaDTOV1[];
    areaResponsables: AreaResponsableDTO[];
    campuses: CampusDTOV1[];
    nivelModalidades: NivelModalidadDTOV1[];
    regiones: RegionDTOV1[];
    constructor() {
        this.id = null;
        this.nombre = null;
        this.correo = null;
        this.activo = null;
        this.esAdmin = null;
        this.perfilId = null;
        this.nivelRevision = null;
        this.areaCorporativas = [];
        this.nivelModalidades = [];
        this.areaResponsables = [];
        this.campuses = [];
        this.regiones = [];
    }

    getCampusesListString(): string {
        return this.campuses.map((i) => `${i.nombre}`).join(', ');
    }
    getAreaResponsablesListString(): string {
        return this.areaResponsables.map((i) => `${i.nombre}`).join(', ');
    }
    getCorporateAreaListtString(): string {
        return this.areaCorporativas.map((i) => `${i.nombre}`).join(', ');
    }
    getRegionsString(): string {
        return this.regiones.map((i) => `${i.nombre}`).join(', ');
    }
    getLevelModalityListString(): string {
        return this.nivelModalidades.map((i) => `${i.nivel}/${i.modalidad}`).join(', ');
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
