import { Deserializable } from '../interfaces';
import { EscenarioDTO } from './escenario.dto';

export class EscalaMedicionUpdateDTO implements Deserializable {

    id: string | number;
    confIndicadorSiacId: string | number;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;
    condiciones: MeasureScaleConditionDTO[];

    constructor() {
        this.id = null;
        this.confIndicadorSiacId = null;
        this.fechaCreacion = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
        this.condiciones = [];
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}

export class MeasureScaleConditionDTO implements Deserializable {
    escalaMedicionCondicionId: string | number;
    confEscalaMedicionId: string | number;
    catEscalaMedicionId: string | number;
    escala: string;
    nombre: string;
    condicion: string;

    constructor() {
        this.escalaMedicionCondicionId = null;
        this.confEscalaMedicionId = null;
        this.catEscalaMedicionId = null;
        this.condicion = null;
        this.escala = null;
        this.nombre = null;
        this.condicion = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
