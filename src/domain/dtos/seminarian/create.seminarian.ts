import { Locations_enum, seminarianMinistery_ENUM, CreateUserDTO, CreateForeingSeminarian  } from "../..";




export class CreateSeminarian{
    constructor(
        public readonly foreing_Data:    CreateForeingSeminarian | undefined,
        public readonly location:        Locations_enum,
        public readonly apostleships:    string | undefined,
        public readonly user:            CreateUserDTO,
        public readonly ministery:      seminarianMinistery_ENUM
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];
        const result_user = this.user.Validate();
        const result_foreing = this.foreing_Data?.Validate();
        if (!(this.ministery in seminarianMinistery_ENUM))errorarray.push("Invalid ministery");
        if (!(this.location in Locations_enum))errorarray.push("Invalid location")
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

