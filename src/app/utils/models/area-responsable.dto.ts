import { Serializer } from '@angular/compiler';
import { Deserializable } from '../interfaces';
import { NivelModalidadDTO } from './nivel-modalidad.dto';
import { NivelModalidadDTOV1 } from './nivel-modalidad.dto.v1';
export enum ModalTitle {
    GENERICA = 'Genérica',
    CAMPUS = 'Campus',
}

export class AreaResponsableDTO implements Deserializable {
    areaResponsableId: number;
    nombre: string;
    areaResponsablePadreId: number;
    areaResponsablePadreNombre: string;
    generica: boolean;
    consolidacion: boolean;
    activo: boolean;
    nivelModalidades: NivelModalidadDTOV1[];

    constructor() {
        this.areaResponsableId = null;
        this.nombre = null;
        this.areaResponsablePadreId = null;
        this.areaResponsablePadreNombre = null;
        this.generica = null;
        this.consolidacion = null;
        this.activo = null;
        this.nivelModalidades = null;
    }

    getListNivelModalidad(): string {
        return this.nivelModalidades.map((x) => x.modalidad).join(',');
    }

    getTypeArea(): string {
        return this.generica ? ModalTitle.GENERICA : ModalTitle.CAMPUS;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
