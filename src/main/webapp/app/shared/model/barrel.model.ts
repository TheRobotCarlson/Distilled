import { Moment } from 'moment';

export interface IBarrel {
    id?: number;
    barreledDate?: Moment;
    warehouseWarehouseCode?: string;
    warehouseId?: number;
    mashbillMashbillCode?: string;
    mashbillId?: number;
    customerCustomerCode?: string;
    customerId?: number;
    batchOrderCode?: string;
    batchId?: number;
}

export class Barrel implements IBarrel {
    constructor(
        public id?: number,
        public barreledDate?: Moment,
        public warehouseWarehouseCode?: string,
        public warehouseId?: number,
        public mashbillMashbillCode?: string,
        public mashbillId?: number,
        public customerCustomerCode?: string,
        public customerId?: number,
        public batchOrderCode?: string,
        public batchId?: number
    ) {}
}
