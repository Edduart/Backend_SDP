import { PersonEntity, DegreeEntity, PhoneEntity, InstructorEntity } from "../";
import { SocialMediaEntity } from "./social.media.entity";

export class ProfessorEntity {
  constructor(
    public person: PersonEntity,
    public social: SocialMediaEntity[] | null,
    public phone_number: PhoneEntity[] | null,
    public status_id: number,
    public degrees?: DegreeEntity[],
    public instructor?: InstructorEntity
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
