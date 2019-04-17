import { Moment } from 'moment';
import { IBarrel } from 'app/shared/model/barrel.model';
import { IBatch } from 'app/shared/model/batch.model';

export interface ISchedule {
    id?: number;
    targetDate?: Moment;
    orderCode?: string;
    barrelCount?: number;
    targetProof?: number;
    notes?: string;
    barrels?: IBarrel[];
    batches?: IBatch[];
    mashbillMashbillCode?: string;
    mashbillId?: number;
    customerCustomerCode?: string;
    customerId?: number;
    warehouseWarehouseCode?: string;
    warehouseId?: number;
}

export class Schedule implements ISchedule {
    constructor(
        public id?: number,
        public targetDate?: Moment,
        public orderCode?: string,
        public barrelCount?: number,
        public targetProof?: number,
        public notes?: string,
        public barrels?: IBarrel[],
        public batches?: IBatch[],
        public mashbillMashbillCode?: string,
        public mashbillId?: number,
        public customerCustomerCode?: string,
        public customerId?: number,
        public warehouseWarehouseCode?: string,
        public warehouseId?: number
    ) {}
}
