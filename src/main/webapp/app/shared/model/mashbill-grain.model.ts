export interface IMashbillGrain {
    id?: number;
    quantity?: number;
    grainGrainName?: string;
    grainId?: number;
    mashbillMashbillCode?: string;
    mashbillId?: number;
}

export class MashbillGrain implements IMashbillGrain {
    constructor(
        public id?: number,
        public quantity?: number,
        public grainGrainName?: string,
        public grainId?: number,
        public mashbillMashbillCode?: string,
        public mashbillId?: number
    ) {}
}
