import { CapituloDTO } from './capitulo';
import { Deserializable } from '../interfaces';
import { CriterioDTO } from './criterio';
import { CampusDTO } from './campus.dto';
import { UsuarioRolProcesoCapitulo } from './usuario-rol-proceso-capitulo';
import { UsuarioRolProcesoCriterio } from './usuario-rol-proceso-criterio';

export class UsuarioRolProcesoDTO implements Deserializable {
  usuarioId: string;
  usuarioNombre: string;
  usuarioCorreo: string;
  acreditadoraProcesoId: number;
  acreditadoraProcesoNombre: string;
  rolProcesoId: string;
  rolProcesoNombre: string;
  carreraId: string;
  carreraNombre: string;
  usuarioRolProcesoCapitulos: UsuarioRolProcesoCapitulo[];
  usuarioRolProcesoCriterios: UsuarioRolProcesoCriterio[];
  campuses: CampusDTO[];
  constructor() {
    this.usuarioId = null;
    this.usuarioNombre = null;
    this.usuarioCorreo = null;
    this.acreditadoraProcesoId = null;
    this.acreditadoraProcesoNombre = null;
    this.rolProcesoId = null;
    this.rolProcesoNombre = null;
    this.carreraId = null;
    this.carreraNombre = null;
    this.usuarioRolProcesoCapitulos = [];
    this.usuarioRolProcesoCriterios = [];
    this.campuses = [];
  }

  deserialize(input: any): this {
    if (this.usuarioRolProcesoCapitulos) {
      this.usuarioRolProcesoCapitulos = this.usuarioRolProcesoCapitulos.map((item) =>
        new UsuarioRolProcesoCapitulo().deserialize(item)
      );
    }
    if (this.usuarioRolProcesoCriterios) {
      this.usuarioRolProcesoCriterios = this.usuarioRolProcesoCriterios.map((item) =>
        new UsuarioRolProcesoCriterio().deserialize(item)
      );
    }
    if (this.campuses) {
      this.campuses = this.campuses.map((item) => new CampusDTO().deserialize(item));
    }

    Object.assign(this, input);
    return this;
  }
}
