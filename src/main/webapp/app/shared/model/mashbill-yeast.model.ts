export interface IMashbillYeast {
    id?: number;
    quantity?: number;
    mashbillId?: number;
    yeastYeastCode?: string;
    yeastId?: number;
}

export class MashbillYeast implements IMashbillYeast {
    constructor(
        public id?: number,
        public quantity?: number,
        public mashbillId?: number,
        public yeastYeastCode?: string,
        public yeastId?: number
    ) {}
}
