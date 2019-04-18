export interface IMashbillYeast {
    id?: number;
    quantity?: number;
    yeastYeastCode?: string;
    yeastId?: number;
    mashbillId?: number;
}

export class MashbillYeast implements IMashbillYeast {
    constructor(
        public id?: number,
        public quantity?: number,
        public yeastYeastCode?: string,
        public yeastId?: number,
        public mashbillId?: number
    ) {}
}
