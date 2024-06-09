import { PersonEntity } from "../../entities";
import { SocialMedia, CreatePhone} from "../";
export class CreateWorker{
    private constructor(
        public readonly persona: PersonEntity,
        public readonly job_position: string,
        public readonly social: SocialMedia|null,
        public readonly telefono: CreatePhone|null,
    ){}
}

export enum basic_worker_job_position {
    Mantenimiento   = "Mantenimiento",
    Cocinero        = "Cocinero",
    Transportista   = "Transportista",
  }