export interface IProductionSchedule {
    id?: number;
    proofGallons?: number;
    actualBarrelCount?: number;
}

export class ProductionSchedule implements IProductionSchedule {
    constructor(public id?: number, public proofGallons?: number, public actualBarrelCount?: number) {}
}
