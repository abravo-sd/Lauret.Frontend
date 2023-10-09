import { Deserializable } from '../interfaces';
import { LibroHoja } from './libro-hoja';

export class LibroIndice implements Deserializable {
  id: number;
  titulo: string;
  hijos: LibroIndice[];
  data?: LibroHoja;
  constructor() {
    this.id = null;
    this.titulo = null;
    this.hijos = [];
    this.data = null;
  }

  deserialize(input: any): this {
    if (this.hijos.length > 0) {
      this.hijos = this.hijos.map((item) => new LibroIndice().deserialize(item));
    }

    Object.assign(this, input);
    return this;
  }
}
