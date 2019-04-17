export interface IYeastSummary {
    id?: number;
}

export class YeastSummary implements IYeastSummary {
    constructor(public id?: number) {}
}
