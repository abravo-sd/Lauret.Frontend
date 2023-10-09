import { Deserializable } from '../interfaces';

export class AcreditadoraDTOV1 implements Deserializable {
    acreditadoraId: string;
    nombre: string;
    activo: boolean;
    esFimpes: boolean;
    acreditadoraProcesos: AcreditadoraProcesoDTOV1[];
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string

    constructor() {
        this.acreditadoraId = null;
        this.nombre = null;
        this.activo = false;
        this.esFimpes = false;
        this.acreditadoraProcesos = [];
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

export class AcreditadoraProcesoDTOV1 implements Deserializable {
    acreditadoraProcesoId: string | number;
    nombre: string;
    fechaInicio: Date | string;
    fechaFin: Date | string;
    fechaCreacion: Date | string;
    usuarioCreacion:  string;
    fechaModificacion: Date | string;
    usuarioModificacion:  string;
    acreditadora: string;
    areaResponsabilidads: [];
    capitulos: [];
    comentarioSeguimientos: [];
    criterios: [];
    evidencia: [];
    registroEvidencia: [];
    rolProcesos: [];
    tipoEvidencia: [];

    constructor() {
        this.acreditadoraProcesoId = 0;
        this.nombre = null;
        this.fechaInicio = null;
        this.fechaFin = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
