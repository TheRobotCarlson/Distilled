import { IMashbill } from 'app/shared/model/mashbill.model';

export interface IMashbillGrain {
    id?: number;
    quantity?: number;
    grainGrainName?: string;
    grainId?: number;
    mashbills?: IMashbill[];
}

export class MashbillGrain implements IMashbillGrain {
    constructor(
        public id?: number,
        public quantity?: number,
        public grainGrainName?: string,
        public grainId?: number,
        public mashbills?: IMashbill[]
    ) {}
}
