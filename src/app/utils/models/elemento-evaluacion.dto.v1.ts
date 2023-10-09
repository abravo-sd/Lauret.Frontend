import { Deserializable } from '../interfaces';

export class ElementoEvaluacionDTOV1 implements Deserializable {
  id: string | number;
  catPeriodoEvaluacionId: string | number;
  anio: string | number;
  idCiclo: string | number;
  ciclo: string;
  idInstitucion: string | number;
  institucion: string;
  proceso: string | number;
  catAreaResponsableId: string | number;
  areaResponsable: string;
  catNivelModalidadId: string | number;
  nivelModalidad: string;
  // listLevelModality: {id: string | number, nombre: string}[];
  catComponenteId: string | number;
  claveComponente: string;
  componente: string;
  catElementoEvaluacionId: string | number;
  claveElementoEvaluacion: string;
  elementoEvaluacion: string;
  catAreaCorporativaId: string | number;
  siglasAreaCorporativa: string;
  areaCorporativa: string;
  subareasAreaCorporativa: string;
  activo: true;
  listaArchivos: ElementoEvaluacionListaArchivosDTO[];
  fechaCreacion: Date | string;
  usuarioCreacion: string;
  fechaModificacion: Date | string;
  usuarioModificacion: string;

  constructor() {
    this.id = null;
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
    this.subareasAreaCorporativa = null;
    this.activo = null;
    this.listaArchivos = [];
    this.fechaCreacion = null;
    this.usuarioCreacion = null;
    this.fechaModificacion = null;
    this.usuarioModificacion = null;
  }

  getProccessString(): string {
    //return `${this.proceso ? 'procedimiento_' + this.proceso : null}`;
    return `${this.proceso ? this.proceso : null}`;
  }

  deserialize(input: any): this {
    if (this.listaArchivos) {
      this.listaArchivos = this.listaArchivos.map((item) => new ElementoEvaluacionListaArchivosDTO().deserialize(item));
    }
    Object.assign(this, input);
    return this;
  }
}

export class ElementoEvaluacionListaArchivosDTO implements Deserializable {
  id: string | number;
  confElementoEvaluacionId: string | number;
  azureStorageFileId: string | number;
  fileName: number;

  constructor() {
    this.id = null;
    this.confElementoEvaluacionId = null;
    this.azureStorageFileId = null;
    this.fileName = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class ElementoEvaluacionAnio implements Deserializable {
  anio: string | number;

  constructor() {
    this.anio = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class ElementoEvaluacionCycle implements Deserializable {
  idCiclo: string | number;
  ciclo: string;

  constructor() {
    this.idCiclo = null;
    this.ciclo = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class ElementoEvaluacionInstitution implements Deserializable {
  idInstitucion: string | number;
  institucion: string;

  constructor() {
    this.idInstitucion = null;
    this.institucion = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class ElementoEvaluacionProccess implements Deserializable {
  idPeriodoEvaluacion: string | number;
  proceso: string | number;
  constructor() {
    this.idPeriodoEvaluacion = null;
    this.proceso = null;
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

export class ElementoEvaluacionAddUpdateDTO implements Deserializable {
  id: string | number;
  catPeriodoEvaluacionId: string | number;
  catAreaResponsableId: string | number;
  catNivelModalidadId: string | number;
  catComponenteId: string | number;
  catElementoEvaluacionId: string | number;
  catAreaCorporativaId: string | number;
  catSubAreaCorporativaId: string | number;
  activo: boolean;
  fechaCreacion: Date | string;
  usuarioCreacion: string;
  fechaModificacion: Date | string;
  usuarioModificacion: string;
  listaArchivos: ListaArchivosElementoEvaluacion[];

  constructor() {
    this.id = null;
    this.catPeriodoEvaluacionId = 0;
    this.catAreaResponsableId = null;
    this.catNivelModalidadId = null;
    this.catComponenteId = null;
    this.catElementoEvaluacionId = null;
    this.catAreaCorporativaId = null;
    this.catSubAreaCorporativaId = null;
    this.activo = null;
    this.fechaCreacion = null;
    this.usuarioCreacion = null;
    this.fechaModificacion = null;
    this.usuarioModificacion = null;
    this.listaArchivos = [];
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class ListaArchivosElementoEvaluacion implements Deserializable {
  id: string | number;
  confElementoEvaluacionId: string | number;
  azureStorageFileId: string | number;
  fileName: string;

  constructor() {
    this.id = null;
    this.confElementoEvaluacionId = null;
    this.azureStorageFileId = null;
    this.fileName = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
