import { Deserializable } from '../interfaces';

export class PageResult<T> implements Deserializable {
    page: number;
    pageSize: number;
    totalCount: number;
    data: T[];

    constructor() {
        this.page = null;
        this.pageSize = null;
        this.totalCount = null;
        this.data = [];
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
