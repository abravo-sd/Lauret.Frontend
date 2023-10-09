import { Deserializable } from '../interfaces';

export class LibroHoja implements Deserializable {
  breadcrumb: string[];
  titulo: string;
  contenido: string;
  constructor() {
    this.breadcrumb = null;
    this.titulo = null;
    this.contenido = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
