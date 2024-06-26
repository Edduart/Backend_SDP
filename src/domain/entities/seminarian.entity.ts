import { DegreeEntity } from "./degree.entity";
import { PersonEntity } from "./person.entity";
import { PhoneEntity } from "./phone.entity";
import { SocialMediaEntity } from "./social.media.entity";
import { User_Entity } from "./user_entity"

export class SeminarianEntity{
    constructor(
        public person:          PersonEntity,
        public social:          SocialMediaEntity[]     | null,
        public phone:           PhoneEntity[]           | null,
        public degree:          DegreeEntity[]          | null,
        public foreing_Data:    SeminarianEntity        | null,
        public status:          SeminarianEntity,
        public user:            User_Entity
    ){}

}