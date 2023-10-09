import { Deserializable } from '../interfaces';

// o	Clave de la evidencia. Campo alfanumérico de 10 posiciones, campo obligatorio
// o	Nombre de la evidencia. Campo alfanumérico de 150 posiciones, campo obligatorio
// o	Descripción de la evidencia. Campo Alfanumérico de 250 posiciones, campo obligatorio 
// o	Cantidad de evidencias. campo de numérico de 3 posiciones campo obligatorio
export class EvidenceDTO implements Deserializable {
    id: string;
    clave: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;

    constructor() {
        this.id = null;
        this.clave = null;
        this.nombre = null;
        this.descripcion = null;
        this.cantidad = null;
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
