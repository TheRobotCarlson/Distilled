export interface ISpirit {
    id?: number;
    category?: string;
    name?: string;
    code?: string;
}

export class Spirit implements ISpirit {
    constructor(public id?: number, public category?: string, public name?: string, public code?: string) {}
}
