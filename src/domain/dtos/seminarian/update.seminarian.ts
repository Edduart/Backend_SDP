import { CreateForeingSeminarian, CreatePerson, Locations_enum, seminarian_status_enum, seminarianMinistery_ENUM } from "../..";

export class UpdateSeminarian{
    constructor(
        public readonly foreing_Data:    CreateForeingSeminarian | undefined,
        public readonly location:        Locations_enum,
        public readonly apostleships:    string | undefined,
        public readonly person:          CreatePerson,
        public readonly ministery:       seminarianMinistery_ENUM,
        public readonly status:          seminarian_status_enum,
    ){}
    
    public Validate(): string|null{
        console.log(this.status);
        let errorarray: string[]= [];
        const result_user = this.person.Validate();
        const result_foreing = this.foreing_Data?.Validate();
        if (!(this.ministery in seminarianMinistery_ENUM))errorarray.push("Invalid ministery");
        if (!(this.location in Locations_enum))errorarray.push("Invalid location")
        if (!(this.status in seminarian_status_enum))errorarray.push("Invalid status")
        if(result_user != null){
            errorarray.push(result_user);
        }
        
        
        if(result_foreing != null){
            errorarray.push(result_foreing);
        }
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }

}