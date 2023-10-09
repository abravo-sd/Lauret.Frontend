import { Deserializable } from '../interfaces';
import { EscenarioDTO } from './escenario.dto';

export class EscalaMedicionDTOV1 implements Deserializable {
    id: number;
    confIndicadorSiacId: string | number;
    confElementoEvaluacionId: string | number;
    catIndicadorSiacId: string | number;
    claveIndicadorSiac: string;
    indicadorSiac: string;
    componenteUvmId: string | number;
    nombreComponenteUvm: string;
    descripcionComponenteUvm: string;
    indicadorUvmId: string | number;
    nombreIndicadorUvm: string;
    subindicadorUvmId: string | number;
    nombreSubIndicadorUvm: string;
    catPeriodoEvaluacionId: string | number;
    anio: string | number;
    idCiclo: string | number;
    ciclo: string;
    idInstitucion: string | number;
    institucion: string;
    proceso: string;
    catAreaResponsableId: string | number;
    areaResponsable: string;
    catNivelModalidadId: string | number;
    nivelModalidad: string;
    catComponenteId: string | number;
    claveComponente: string;
    componente: string;
    catElementoEvaluacionId: string | number;
    claveElementoEvaluacion: string;
    elementoEvaluacion: string;
    catAreaCorporativaId: string | number;
    siglasAreaCorporativa: string;
    areaCorporativa: string;
    catSubAreaCorporativaId: string | number;
    subAreaCorporativa: string;
    siglasSubAreaCorporativa: string;
    catNormativaId: string | number;
    claveNormativa: string;
    nombreNormativa: string;
    catEvidenciaId: string | number;
    activo: boolean;
    claveEvidencia: string;
    nombreEvidencia: string;
    descripcionEvidencia: string;
    cantidadEvidencia: string | number;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;
    condiciones: EscalaMedicionCondicionesDTO[];

    constructor() {
        this.id = null;
        this.confIndicadorSiacId = null;
        this.confElementoEvaluacionId = null;
        this.catIndicadorSiacId = null;
        this.claveIndicadorSiac = null;
        this.indicadorSiac = null;
        this.componenteUvmId = null;
        this.nombreComponenteUvm = null;
        this.descripcionComponenteUvm = null;
        this.indicadorUvmId = null;
        this.nombreIndicadorUvm = null;
        this.subindicadorUvmId = null;
        this.nombreSubIndicadorUvm = null;
        this.catPeriodoEvaluacionId = null;
        this.anio = null;
        this.idCiclo = null;
        this.ciclo = null;
        this.idInstitucion = null;
        this.institucion = null;
        this.proceso = null;
        this.catAreaResponsableId = null;
        this.areaResponsable = null;
        this.catNivelModalidadId = null;
        this.nivelModalidad = null;
        this.catComponenteId = null;
        this.claveComponente = null;
        this.componente = null;
        this.catElementoEvaluacionId = null;
        this.claveElementoEvaluacion = null;
        this.elementoEvaluacion = null;
        this.catAreaCorporativaId = null;
        this.siglasAreaCorporativa = null;
        this.areaCorporativa = null;
        this.catSubAreaCorporativaId = null;
        this.subAreaCorporativa = null;
        this.siglasSubAreaCorporativa = null;
        this.catNormativaId = null;
        this.claveNormativa = null;
        this.nombreNormativa = null;
        this.catEvidenciaId = null;
        this.activo = null;
        this.claveEvidencia = null;
        this.nombreEvidencia = null;
        this.descripcionEvidencia = null;
        this.cantidadEvidencia = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
        this.condiciones = [];
    }

    getProccessString(): string {
        //return `${this.proceso ? 'procedimiento_' + this.proceso : null}`;
        return `${this.proceso ? this.proceso : null}`;

    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}

export class EscalaMedicionCondicionesDTO implements Deserializable {
    escalaMedicionCondicionId: string | number;
    confEscalaMedicionId: string | number;
    catEscalaMedicionId: string | number;
    escala: string;
    nombre: string;
    condicion: string;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.escalaMedicionCondicionId = null;
        this.confEscalaMedicionId = null;
        this.catEscalaMedicionId = null;
        this.escala = null;
        this.nombre = null;
        this.condicion = null;
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

export class CatalogEscalaMedicionDTOV1 implements Deserializable {

    catEscalaMedicionId: string | number;
    nombre: string;
    escala: string;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.catEscalaMedicionId = null;
        this.nombre = null;
        this.escala = null;
        this.activo = null;
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
