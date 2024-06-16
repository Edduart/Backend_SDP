import { PersonEntity } from "./person.entity";
import { PhoneEntity } from "./phone.entity";
import { SocialMediaEntity } from "./social.media.entity";


export class WorkerEntity{
    constructor(
        public person: PersonEntity,
        public social: SocialMediaEntity[] | null,
        public phone: PhoneEntity[] | null,
        public position: Job_Psotion_Enum,
    ){}
    public static fromdb(person: PersonEntity, social: SocialMediaEntity[] | null, phone: PhoneEntity[] | null, position: Job_Psotion_Enum){
        
        return new WorkerEntity(person, social, phone, position)
    }
}

export enum Job_Psotion_Enum {
    Mantenimiento   = 'Mantenimiento',
    Cocinero        = 'Cocinero',
    Transportista   = 'Transportista',
}