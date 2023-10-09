import { Deserializable } from '../interfaces';

export class PeriodoEvaluacionDTO implements Deserializable {
    periodoEvaluacionId: number;
    anioId: number;
    cicloNombre: string;
    cicloId: string;
    fechaInicialMeta: string;
    fechaFinMeta: string;
    fechaInicialCapturaResultados: string;
    fechaFinCapturaResultados: string;
    fechaInicialCargaEvidencia: string;
    fechaFinCargaEvidencia: string;
    fechaInicialAutoEvaluacion: string;
    fechaFinAutoEvaluacion: string;
    fechaInicialRevision: string;
    fechaFinRevision: string;
    fechaInicialPlanMejora: string;
    fechaFinPlanMejora: string;
    fechaInicialAuditoria: string;
    fechaFinAuditoria: string;
    activo: boolean;
    constructor() {
        this.periodoEvaluacionId = null;
        this.anioId = null;
        this.cicloNombre = null;
        this.cicloId = null;
        this.fechaInicialMeta = null;
        this.fechaFinMeta = null;
        this.fechaInicialCapturaResultados = null;
        this.fechaFinCapturaResultados = null;
        this.fechaInicialCargaEvidencia = null;
        this.fechaFinCargaEvidencia = null;
        this.fechaInicialAutoEvaluacion = null;
        this.fechaFinAutoEvaluacion = null;
        this.fechaInicialRevision = null;
        this.fechaFinRevision = null;
        this.fechaInicialPlanMejora = null;
        this.fechaFinPlanMejora = null;
        this.fechaInicialAuditoria = null;
        this.fechaFinAuditoria = null;
        this.activo = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
