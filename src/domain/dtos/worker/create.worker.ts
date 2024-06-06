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