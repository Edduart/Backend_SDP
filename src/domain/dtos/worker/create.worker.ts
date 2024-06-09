import { Job_Psotion_Enum, PersonEntity } from "../../entities";
import { SocialMedia, CreatePhone} from "../";
export class CreateWorker{
    constructor(
        public readonly persona: PersonEntity,
        public readonly job_position: Job_Psotion_Enum,
        public readonly social: SocialMedia[]|null,
        public readonly telefono: CreatePhone[]|null,
    ){}
}

