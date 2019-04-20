import { Moment } from 'moment';
import { IBarrel } from 'app/shared/model/barrel.model';

export interface IBatch {
    id?: number;
    proof?: number;
    date?: Moment;
    orderCode?: string;
    barrels?: IBarrel[];
    warehouseWarehouseCode?: string;
    warehouseId?: number;
    scheduleId?: number;
}

export class Batch implements IBatch {
    constructor(
        public id?: number,
        public proof?: number,
        public date?: Moment,
        public orderCode?: string,
        public barrels?: IBarrel[],
        public warehouseWarehouseCode?: string,
        public warehouseId?: number,
        public scheduleId?: number
    ) {}
}
