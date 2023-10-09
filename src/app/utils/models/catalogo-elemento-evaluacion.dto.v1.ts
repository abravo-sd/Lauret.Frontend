import { Deserializable } from '../interfaces';

export class CatalogoElementoEvaluacionDTOV1 implements Deserializable {
  id: string;
  clave: string;
  nombre: string;
  activo: boolean;
  fechaCreacion: Date | string;
  usuarioCreacion: string;
  fechaModificacion: Date | string;
  usuarioModificacion: string;

  // Sirve para componentes angular de selección multiple
  //checked: boolean;
  // nombreEvidencia: string;

  constructor() {
    this.id = null;
    this.clave = null;
    this.nombre = null;
    this.activo = null;
    this.fechaCreacion = null;
    this.usuarioCreacion = null;
    this.fechaModificacion = null;
    this.usuarioModificacion = null;
    //this.checked = false;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
