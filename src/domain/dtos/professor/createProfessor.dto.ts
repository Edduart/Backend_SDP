//import { PersonEntity } from "../../entities";
import { CreatePerson, CreateUserDTO } from "../";

export class CreateProfessor {
  constructor(
    public readonly person: CreatePerson,
    public readonly user: CreateUserDTO 
    //public readonly socials: CreateSocialMedia[] | null,
  ) //public readonly phones: CreatePhone[] | null
  {}

  //validations
}
