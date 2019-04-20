import { Moment } from 'moment';
import { IBatch } from 'app/shared/model/batch.model';

export interface ISchedule {
    id?: number;
    targetDate?: Moment;
    barrelCount?: number;
    targetProof?: number;
    notes?: string;
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
        public barrelCount?: number,
        public targetProof?: number,
        public notes?: string,
        public batches?: IBatch[],
        public mashbillMashbillCode?: string,
        public mashbillId?: number,
        public customerCustomerCode?: string,
        public customerId?: number,
        public warehouseWarehouseCode?: string,
        public warehouseId?: number
    ) {}
}
