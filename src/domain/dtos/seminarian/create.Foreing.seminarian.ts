import { StageEnum } from "../..";

export class CreateForeingSeminarian{

    constructor(
        public seminary_name: string,
        public stage: StageEnum,
        public stage_year: number,
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];
        if((this.seminary_name.length < 6) || (this.seminary_name.length >200))errorarray.push("email must be between 6 and 200 characters")
        if (isNaN(Number(this.stage_year))) errorarray.push("Stage_year must be a number")
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }



}