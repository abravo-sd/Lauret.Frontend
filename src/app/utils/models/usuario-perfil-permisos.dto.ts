
export class UsuarioPerfilPermisosDTO {
  nombre: string;
  correo: string;
  vistas: Vista[] = [];
}

export class Vista {
  vistaId: number;
  nombre: string;
  tipoVista: string;
  permisos: Permiso[] = [];
}

export interface Permiso {
  id: number;
  nombre: string;
  descripcion: string;
}
