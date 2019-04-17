import { IBarrel } from 'app/shared/model/barrel.model';
import { ISchedule } from 'app/shared/model/schedule.model';

export interface IWarehouse {
    id?: number;
    warehouseCode?: string;
    owner?: string;
    capacity?: number;
    barrels?: IBarrel[];
    schedules?: ISchedule[];
}

export class Warehouse implements IWarehouse {
    constructor(
        public id?: number,
        public warehouseCode?: string,
        public owner?: string,
        public capacity?: number,
        public barrels?: IBarrel[],
        public schedules?: ISchedule[]
    ) {}
}
