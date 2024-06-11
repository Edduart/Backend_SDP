import { Job_Psotion_Enum, PersonEntity } from "../../entities";
import { SocialMedia, CreatePhone} from "../";
export class CreateWorker{
    constructor(
        public readonly persona: PersonEntity,
        public readonly job_position: Job_Psotion_Enum,
        public readonly social: SocialMedia[]|null,
        public readonly telefono: CreatePhone[]|null,
    ){}

    validate(): Promise<void> {
        return new Promise((resolve, reject) => {
          // Call the validate method of the persona
          this.persona.validate()
            .then(() => {
              // If the persona is valid, check the job position
              if (!(this.job_position in Job_Psotion_Enum)) {
                reject(new Error("Trabajo Invalida"));
              } else {
                // If everything is valid, resolve the Promise
                resolve();
              }
            })
            .catch((error: any) => {
              // If the persona is not valid, reject the Promise
              reject("Error de validador de persona " + error);
            });
        });
      }

}

