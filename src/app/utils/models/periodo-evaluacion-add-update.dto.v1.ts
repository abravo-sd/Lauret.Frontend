import { Deserializable } from '../interfaces';
import { PeriodoEvaluacionEtapaAddUpdateDTOV1 } from './periodo-evaluacion-etapa-add-update.dto.v1';

export class PeriodoEvaluacionAddUpdateDTOV1 implements Deserializable {
    id: string | number;
    clave: string;
    anio: string | number;
    cicloId: string | number;
    catInstitucionId: string | number;
    proceso: string | number;
    activo: boolean;
    etapas: PeriodoEvaluacionEtapaAddUpdateDTOV1[];
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.id = null;
        this.clave = null;
        this.anio = null;
        this.cicloId = null;
        this.catInstitucionId = null;
        this.proceso = null;
        this.activo = null;
        this.etapas = [];
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
