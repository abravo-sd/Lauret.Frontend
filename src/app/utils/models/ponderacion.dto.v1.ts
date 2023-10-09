import { Deserializable } from '../interfaces';
export class PonderacionDTOV1 implements Deserializable {
    id: string;
    // clave: string;
    componenteId: string;
    nombre: string;
    nivelModalidadId: string;
    idNivelModalidad: number = null;
    nivelModalidad: string;
    puntuacion: number;
    activo: boolean;
    fechaCreacion: Date | string;
    usuarioCreacion: string;
    fechaModificacion: Date | string;
    usuarioModificacion: string;
    puntuacionPonderaciones: { id: string, puntuacion: number }[]; // Nueva propiedad


    constructor() {
        this.id = null;
        // this.clave = null;
        this.componenteId = null;
        this.nombre = null;
        this.nivelModalidadId = null;
        this.nivelModalidad = null;
        this.puntuacion = 0;
        this.activo = null;
        this.fechaCreacion = null;
        this.usuarioCreacion = null;
        this.fechaModificacion = null;
        this.usuarioModificacion = null;
        this.puntuacionPonderaciones = []; // Inicializamos como una lista vacía

    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
