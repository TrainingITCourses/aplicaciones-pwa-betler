export class Filters {
    public status: number;
    public agency: string;
    public type: number;

    constructor (statusParam, agencyParam, typeParam){ 
        this.status = statusParam;
        this.agency = agencyParam;
        this.type = typeParam;
    }
}
