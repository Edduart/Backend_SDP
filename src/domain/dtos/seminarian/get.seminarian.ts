import { Locations_enum, seminarian_status_enum, seminarianMinistery_ENUM } from "../..";

export class GetSeminarianDTO{
    constructor(
        public readonly id:             string                     | undefined,
        public readonly forename:       string                     | undefined,
        public readonly surname:        string                     | undefined,
        public readonly parish_id:      number                     | undefined,
        public readonly diocese_id:     number                     | undefined,
        public readonly first_Date:     Date                       | undefined,
        public readonly second_Date:    Date                       | undefined,
        public readonly ministery:      seminarianMinistery_ENUM   | undefined,
        public readonly foreing:        boolean                    | undefined,
        public readonly location:       Locations_enum             | undefined,
        public readonly status:         seminarian_status_enum     | undefined,
    ){}
    public GetForeing(){
        if(this.foreing){
            console.log("Foreing");
            return null
        } return undefined
    }
    public Validate(): string|null{
        let errorarray: string[]= [];
        if(this.status != undefined){
            if (!(this.status in seminarian_status_enum))errorarray.push("Invalid status");
        }
        if(this.ministery != undefined){
            if (!(this.ministery in seminarianMinistery_ENUM))errorarray.push("Invalid ministery");
        }
        if(this.location != undefined){
            if (!(this.location in Locations_enum))errorarray.push("Invalid location");
        }
        if(this.diocese_id != undefined){
            if (isNaN(Number(this.diocese_id))) errorarray.push("Diocese_id must be a number")
        }
        if(this.parish_id != undefined){
            if (isNaN(Number(this.parish_id))) errorarray.push("parish_id must be a number")
        }
        if((this.first_Date != undefined) && (this.second_Date != undefined)){
            if(this.first_Date > this.second_Date)errorarray.push("invalid data range")
        }
        
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }

}