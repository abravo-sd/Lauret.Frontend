import { Deserializable } from '../interfaces';
import { AreaCorporativaSubAreaDTO } from './area-corporativ-sub-area.dto';
import { SubAreaCorporativaDTOV1 } from './subarea-corporativa.dto.v1';

export class AreaCorporativaDTOV1 implements Deserializable {
    id: string;
    siglas: string;
    nombre: string;
    subCorporateAreas: SubAreaCorporativaDTOV1[];
    listaSubareas: number[] = null;
    subareas: string = null;
    subareasIds: string = null;
    subareas_: number[] = null;    
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;


    constructor() {
        this.id = null;
        this.siglas = null;
        this.nombre = null;
        this.activo = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
        this.subCorporateAreas = [];
    }

    getareaCorporativaSubaAreaListString(): string {
        return this.subCorporateAreas.map((i) => `${i.nombre}`).join(', ');
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
