export interface IGrain {
    id?: number;
    grainName?: string;
    grainBushelWeight?: number;
}

export class Grain implements IGrain {
    constructor(public id?: number, public grainName?: string, public grainBushelWeight?: number) {}
}
