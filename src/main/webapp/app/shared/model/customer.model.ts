import { IMashbill } from 'app/shared/model/mashbill.model';
import { IBarrel } from 'app/shared/model/barrel.model';
import { ISchedule } from 'app/shared/model/schedule.model';

export interface ICustomer {
    id?: number;
    customerName?: string;
    customerCode?: string;
    mashbills?: IMashbill[];
    barrels?: IBarrel[];
    schedules?: ISchedule[];
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public customerName?: string,
        public customerCode?: string,
        public mashbills?: IMashbill[],
        public barrels?: IBarrel[],
        public schedules?: ISchedule[]
    ) {}
}
