import { Deserializable } from '../interfaces';

export class SubIndicadorUVMDTO implements Deserializable {
    subIndicadorUvmId: number;
    nombreSubIndicadorUvm: string;
    activo: boolean;

    constructor() {
        this.subIndicadorUvmId = 0;
        this.nombreSubIndicadorUvm = null;
        this.activo = null;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
