import { Moment } from 'moment';
import { IBarrel } from 'app/shared/model/barrel.model';

export interface IBatch {
    id?: number;
    proof?: number;
    date?: Moment;
    batchNumber?: string;
    barrels?: IBarrel[];
    scheduleOrderCode?: string;
    scheduleId?: number;
    mashbillMashbillCode?: string;
    mashbillId?: number;
}

export class Batch implements IBatch {
    constructor(
        public id?: number,
        public proof?: number,
        public date?: Moment,
        public batchNumber?: string,
        public barrels?: IBarrel[],
        public scheduleOrderCode?: string,
        public scheduleId?: number,
        public mashbillMashbillCode?: string,
        public mashbillId?: number
    ) {}
}
