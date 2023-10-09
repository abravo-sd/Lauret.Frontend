import { Deserializable } from '../interfaces';
import { PeriodoEvaluacionEtapaDTOV1 } from './periodo-evaluacion-etapa.dto.v1';

export class PeriodoEvaluacionDTOV1 implements Deserializable {
    idPeriodoEvaluacion: string;
    clave: string;
    anio: string | number;
    idCiclo: string | number;
    ciclo: string;
    idInstitucion: string | number;
    institucion: string;
    proceso: string | number;
    activo: boolean;
    etapas: PeriodoEvaluacionEtapaDTOV1[];
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.idPeriodoEvaluacion = null;
        this.clave = null;
        this.anio = null;
        this.idCiclo = null;
        this.ciclo = null;
        this.idInstitucion = null;
        this.institucion = null;
        this.proceso = null;
        this.activo = null;
        this.etapas = [];
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
    }
    
    getProccessString(): string {
       //2-ago-23 return `${this.proceso ? 'procedimiento_' + this.proceso : null}`;
       return `${this.proceso ?  this.proceso : null}`;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
