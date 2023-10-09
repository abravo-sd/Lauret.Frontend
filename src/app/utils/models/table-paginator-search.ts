import { matPaginatorDefaultOptions } from '../helpers';
import { Deserializable } from '../interfaces';

export class TablePaginatorSearch implements Deserializable {
    pageSize: number;
    pageNumber: number;
    orderBy: string;
    dir: string;
    filter: string;
    search: string;
    inactives: boolean;
   

    constructor() {
        this.pageSize = matPaginatorDefaultOptions.pageSizeOptions[1];
        this.pageNumber = 1;
        this.orderBy = '';
        this.dir = '';
        this.filter = '';
        this.search = '';
        this.inactives = false;
       
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
