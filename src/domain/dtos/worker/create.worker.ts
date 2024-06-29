import { Job_Psotion_Enum, SocialMediaEntity } from "../../entities";
import { CreatePhone, CreatePerson, CreateSocialMedia} from "../";
export class CreateWorker{
    constructor(
        public readonly persona: CreatePerson,
        public readonly job_position: Job_Psotion_Enum,
        public readonly social: SocialMediaEntity[]|null,
        public readonly telefono: CreatePhone[]|null,
    ){}

    validate(): Promise<void> {
        return new Promise((resolve, reject) => {
          // Call the validate method of the persona
          resolve()
        });
      }
}

