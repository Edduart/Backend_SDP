import { PersonEntity } from "./person.entity";
import { PhoneEntity } from "./phone.entity";
import { SocialMediaEntity } from "./social.media.entity";

export class ProfessorEntity {
  constructor(
    public person: PersonEntity,
    public social: SocialMediaEntity[] | null,
    public phone_number: PhoneEntity[] | null,
    public status_id: number
  ) {
    //this.status_id = 1;
  }

  public static fromObject(
    person: PersonEntity,
    social: SocialMediaEntity[] | null,
    phone_number: PhoneEntity[] | null,
    status_id: number
  ) {
    // validations

    // validations

    return new ProfessorEntity(person, social, phone_number, status_id);
  }
}
