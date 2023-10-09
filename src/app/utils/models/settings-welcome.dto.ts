import { Deserializable } from '../interfaces';

export class SettingsWelcomeDTO implements Deserializable {
  id: number = 0;
  htmlBienvenida: string = null;

  bienvenida: string | number;
  aviso: string;
  manualUsuario: string;
  listaArchivos: ListaArchivosModuloBienvenida[];

  constructor() {
    this.bienvenida = null;
    this.aviso = null;
    this.manualUsuario = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class ListaArchivosModuloBienvenida implements Deserializable {
  uri: string;
  name: string;
  contentType: string;

  constructor() {
    this.uri = null;
    this.name = null;
    this.contentType = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
