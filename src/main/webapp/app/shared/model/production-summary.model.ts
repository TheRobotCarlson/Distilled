export interface IProductionSummary {
    id?: number;
}

export class ProductionSummary implements IProductionSummary {
    constructor(public id?: number) {}
}
