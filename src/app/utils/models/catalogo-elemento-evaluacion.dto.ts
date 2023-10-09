import { Deserializable } from '../interfaces';
import { NormativaDTO } from './normativa.dto';

export class CatalogoElementoEvaluacionDTO implements Deserializable {
    elementoEvaluacionId: string;
    nombreElementoEvaluacion: string;
    nombreEvidencia: string;
    descripcionEvidencia: string;
    cantidadEvidencia: number;
    activo: boolean;

    constructor() {
        this.elementoEvaluacionId = null;
        this.nombreElementoEvaluacion = null;
        this.nombreEvidencia = null;
        this.descripcionEvidencia = null;
        this.cantidadEvidencia = null;
        this.activo = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
