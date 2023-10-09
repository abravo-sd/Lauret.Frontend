import { Deserializable } from '../interfaces';

export class CriterioDTOV1 implements Deserializable {
    clave: string;
    criterioId: string;
    descripcion: string;
    acreditadoraProcesoId: number;
    acreditadoraProceso: string;
    carreraId: string;
    carrera: string;
    capituloId: string;
    capitulo: string;
    tipoEvidenciaId: string;
    tipoEvidencium: string;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string
    apartados: [];
    evidencia: [];
    registroEvidencia: [];
    usuarioRolProcesoCriterios: [];

    constructor() {
        this.clave = null;
        this.criterioId = null;
        this.acreditadoraProcesoId = null;
        this.acreditadoraProceso = null;
        this.carreraId = null;
        this.carrera = null;
        this.capituloId = null;
        this.capitulo = null;
        this.tipoEvidenciaId = null;
        this.tipoEvidencium = null;
        this.descripcion = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null
        this.apartados = [];
        this.evidencia = [];
        this.registroEvidencia = [];
        this.usuarioRolProcesoCriterios = [];     
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}


