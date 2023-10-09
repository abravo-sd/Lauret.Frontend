import { Modules } from '../enums/module';
import { Deserializable } from '../interfaces';

export class ModulesCatalog implements Deserializable {
  id: number;
  name: string;
  url: string;
  global: boolean;
  section: string;
  key: Modules;

  constructor() {
    this.id = null;
    this.name = null;
    this.url = null;
    this.global = false;
    this.section = null;
    this.key = null;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  getSections(modulesList: ModulesCatalog[]): string[] {
    return modulesList
      .map((item) => item.section)
      .filter((item, index) => {
        return modulesList.map((item) => item.section).indexOf(item) === index;
      })
      .filter((item) => item);
  }
}
