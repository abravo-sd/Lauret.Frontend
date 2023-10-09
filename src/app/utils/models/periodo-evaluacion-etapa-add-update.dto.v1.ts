import { Deserializable } from '../interfaces';

export class PeriodoEvaluacionEtapaAddUpdateDTOV1 implements Deserializable {
    id: string | number;
    catEtapaId: string | number;;
    catPeriodoEvaluacionId: string | number;
    fechaInicio: Date | string;
    fechaFin: Date | string;

    constructor() {
        this.id = null;
        this.catEtapaId = null;
        this.catPeriodoEvaluacionId = null;
        this.fechaInicio = null;
        this.fechaFin = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
