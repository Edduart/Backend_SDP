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
              if (!(this.job_position in Job_Psotion_Enum)) {
                reject(new Error("Trabajo Invalida"));
              } else {
              
                resolve();
              }
            })
            .catch((error: any) => {
              console.log("etapa 3");
              reject("Error de validador de persona " + error);
            });
        });
      }
}

