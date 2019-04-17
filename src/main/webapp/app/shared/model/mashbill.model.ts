import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { IBarrel } from 'app/shared/model/barrel.model';
import { ISchedule } from 'app/shared/model/schedule.model';
import { IBatch } from 'app/shared/model/batch.model';

export interface IMashbill {
    id?: number;
    mashbillName?: string;
    mashbillCode?: string;
    mashbillNotes?: string;
    yeastId?: number;
    mashbillGrains?: IMashbillGrain[];
    barrels?: IBarrel[];
    schedules?: ISchedule[];
    batches?: IBatch[];
    spiritCode?: string;
    spiritId?: number;
    customerCustomerName?: string;
    customerId?: number;
}

export class Mashbill implements IMashbill {
    constructor(
        public id?: number,
        public mashbillName?: string,
        public mashbillCode?: string,
        public mashbillNotes?: string,
        public yeastId?: number,
        public mashbillGrains?: IMashbillGrain[],
        public barrels?: IBarrel[],
        public schedules?: ISchedule[],
        public batches?: IBatch[],
        public spiritCode?: string,
        public spiritId?: number,
        public customerCustomerName?: string,
        public customerId?: number
    ) {}
}
