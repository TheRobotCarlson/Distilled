export interface IMasterSummary {
    id?: number;
    proofGallons?: number;
    actualBarrelCount?: number;
}

export class MasterSummary implements IMasterSummary {
    constructor(public id?: number, public proofGallons?: number, public actualBarrelCount?: number) {}
}
