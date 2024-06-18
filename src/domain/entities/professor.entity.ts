import { PersonEntity } from "./person.entity";
import { PhoneEntity } from "./phone.entity";
import { SocialMediaEntity } from "./social.media.entity";

export class ProfessorEntity {
  constructor(
    public person: PersonEntity,
    public social: SocialMediaEntity[] | null,
    public phone: PhoneEntity[] | null,
    public status_id: number
  ) {

    this.status_id = 1;
  }

  public static fromObject(
    person: PersonEntity,
    social: SocialMediaEntity[] | null,
    phone: PhoneEntity[] | null,
    status_id: number
  ) {
    
    // validations

    // validations

    return new ProfessorEntity(person, social, phone, status_id);
  }
}
