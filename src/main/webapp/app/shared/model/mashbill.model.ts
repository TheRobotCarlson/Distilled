import { IBarrel } from 'app/shared/model/barrel.model';
import { ISchedule } from 'app/shared/model/schedule.model';
import { IBatch } from 'app/shared/model/batch.model';
import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';

export interface IMashbill {
    id?: number;
    mashbillName?: string;
    mashbillCode?: string;
    mashbillNotes?: string;
    yeastYeastCode?: string;
    yeastId?: number;
    barrels?: IBarrel[];
    schedules?: ISchedule[];
    batches?: IBatch[];
    spiritName?: string;
    spiritId?: number;
    grainCounts?: IMashbillGrain[];
    customerCustomerName?: string;
    customerId?: number;
}

export class Mashbill implements IMashbill {
    constructor(
        public id?: number,
        public mashbillName?: string,
        public mashbillCode?: string,
        public mashbillNotes?: string,
        public yeastYeastCode?: string,
        public yeastId?: number,
        public barrels?: IBarrel[],
        public schedules?: ISchedule[],
        public batches?: IBatch[],
        public spiritName?: string,
        public spiritId?: number,
        public grainCounts?: IMashbillGrain[],
        public customerCustomerName?: string,
        public customerId?: number
    ) {}
}
