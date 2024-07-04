import { PersonEntity } from "./person.entity";
import { PhoneEntity } from "./phone.entity";
import { SocialMediaEntity } from "./social.media.entity";


export class WorkerEntity{
    constructor(
        public position:    Job_Psotion_Enum,
        public person?:     PersonEntity
    ){}
    public static fromdb(person: PersonEntity, position: Job_Psotion_Enum){
        
        return new WorkerEntity(position)
    }
}

export enum Job_Psotion_Enum {
    Mantenimiento   = 'Mantenimiento',
    Cocinero        = 'Cocinero',
    Transportista   = 'Transportista',
}