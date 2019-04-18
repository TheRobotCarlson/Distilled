import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';

export interface IGrain {
    id?: number;
    grainName?: string;
    grainBushelWeight?: number;
    mashbillGrains?: IMashbillGrain[];
}

export class Grain implements IGrain {
    constructor(
        public id?: number,
        public grainName?: string,
        public grainBushelWeight?: number,
        public mashbillGrains?: IMashbillGrain[]
    ) {}
}
