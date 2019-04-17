export interface IGrainForecast {
    id?: number;
}

export class GrainForecast implements IGrainForecast {
    constructor(public id?: number) {}
}
