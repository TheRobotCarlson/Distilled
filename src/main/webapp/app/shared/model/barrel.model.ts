import { Moment } from 'moment';

export interface IBarrel {
    id?: number;
    proof?: number;
    barreledDate?: Moment;
    orderCode?: string;
    warehouseWarehouseCode?: string;
    warehouseId?: number;
    mashbillMashbillCode?: string;
    mashbillId?: number;
    orderOrderCode?: string;
    orderId?: number;
    customerCustomerCode?: string;
    customerId?: number;
    batchBatchNumber?: string;
    batchId?: number;
}

export class Barrel implements IBarrel {
    constructor(
        public id?: number,
        public proof?: number,
        public barreledDate?: Moment,
        public orderCode?: string,
        public warehouseWarehouseCode?: string,
        public warehouseId?: number,
        public mashbillMashbillCode?: string,
        public mashbillId?: number,
        public orderOrderCode?: string,
        public orderId?: number,
        public customerCustomerCode?: string,
        public customerId?: number,
        public batchBatchNumber?: string,
        public batchId?: number
    ) {}
}
