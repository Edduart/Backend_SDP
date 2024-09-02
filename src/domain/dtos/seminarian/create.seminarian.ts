import { Locations_enum, seminarianMinistery_ENUM, CreateUserDTO, CreateForeingSeminarian, StageEnum  } from "../..";




export class CreateSeminarian{
    constructor(
        public readonly foreing_Data:    CreateForeingSeminarian | undefined,
        public readonly location:        Locations_enum,
        public stage:                    string,
        public readonly apostleships:    string | undefined,
        public readonly user:            CreateUserDTO,
        public readonly ministery:      seminarianMinistery_ENUM,
        public stage_num?:              number
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

        switch (this.stage) {
            case "PROPEDEUTICO":
                this.stage_num = 1;
                break;
            case "DISCIPULADO":
                this.stage_num = 2;
                break;
            case "CONFIGURATIVA":
                this.stage_num = 3;
                break;
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

