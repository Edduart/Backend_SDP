import { PersonEntity, DegreeEntity, PhoneEntity, InstructorEntity } from "../";
import { SocialMediaEntity } from "./social.media.entity";

export class ProfessorEntity {
  constructor(
    public person: PersonEntity,
    public social: SocialMediaEntity[] | null,
    public phone_number: PhoneEntity[] | null,
    public status_id_proffesor: number,
    public status_user?: boolean,
    public degrees?: DegreeEntity[] | null,
    public instructor?: object | null,
    public Role_id?: number,
    public status?: number
  ) {
    //this.status_id = 1;
  }

  public static fromObject(
    person: PersonEntity,
    social: SocialMediaEntity[] | null,
    phone_number: PhoneEntity[] | null,
    status_id_proffesor: number,
    status_user: boolean,
    degrees?: DegreeEntity[] | null,
    instructor?: object | null,
    Role_id?: number
  ) {
    // validations

    // validations

    return new ProfessorEntity(
      person,
      social,
      phone_number,
      status_id_proffesor,
      status_user,
      degrees,
      instructor,
      Role_id
    );
  }
}
