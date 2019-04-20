import { IBarrel } from 'app/shared/model/barrel.model';
import { IBatch } from 'app/shared/model/batch.model';

export interface IWarehouse {
    id?: number;
    warehouseCode?: string;
    owner?: string;
    capacity?: number;
    barrels?: IBarrel[];
    batches?: IBatch[];
}

export class Warehouse implements IWarehouse {
    constructor(
        public id?: number,
        public warehouseCode?: string,
        public owner?: string,
        public capacity?: number,
        public barrels?: IBarrel[],
        public batches?: IBatch[]
    ) {}
}
