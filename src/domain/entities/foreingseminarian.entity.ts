

export class ForeingSeminarianEntity{

    constructor(
        public id: string,
        public seminary_name: string,
        public stage: StageEnum,
        public stage_year: number,
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];
        if((this.seminary_name.length < 6) || (this.seminary_name.length >200))errorarray.push("email must be between 6 and 200 characters")
        if (!/^\d{1,20}$/.test(this.id))errorarray.push("ID must be only numeric and max 20 digits long");
        if (isNaN(Number(this.stage_year))) errorarray.push("Stage_year must be a number")
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }



}

export enum StageEnum{
   first    = '1',
   second   = '2',
   third    = '3'
}