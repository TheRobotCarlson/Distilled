import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';

export interface IYeast {
    id?: number;
    yeastName?: string;
    yeastCode?: string;
    yeastPalletNum?: number;
    mashbillYeasts?: IMashbillYeast[];
}

export class Yeast implements IYeast {
    constructor(
        public id?: number,
        public yeastName?: string,
        public yeastCode?: string,
        public yeastPalletNum?: number,
        public mashbillYeasts?: IMashbillYeast[]
    ) {}
}
