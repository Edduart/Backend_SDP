import { Job_Psotion_Enum, SocialMediaEntity } from "../../entities";
import { CreatePhone, CreatePerson, CreateSocialMedia} from "../";
export class CreateWorker{
    constructor(
        public readonly persona:      CreatePerson,
        public readonly job_position: Job_Psotion_Enum,
    ){
    }

    public Validate(): string|null{
      let errorarray: string[]= [];
      const result = this.persona.Validate();
      if (result != null ) errorarray.push(result);
      if (!(this.job_position in Job_Psotion_Enum))errorarray.push("Invalid type of blood");
      if (errorarray.length > 0) {
          return errorarray.join(", ");
      }
      return null;
  }
}

