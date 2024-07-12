import { PersonEntity } from "../../entities";
import { CreatePerson, CreateUserDTO } from "../";

export class UpdateProfessorDto {
  constructor(
    //public readonly person: PersonEntity,
    public readonly user: CreateUserDTO //public readonly phones: CreatePhone[] | null //public readonly socials: CreateSocialMedia[] | null,
  ) {}

  //validations
}
