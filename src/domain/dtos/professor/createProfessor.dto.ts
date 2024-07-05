import { PersonEntity } from "../../entities";
import { CreateSocialMedia, CreatePhone } from "../";

export class CreateProfessor {
  constructor(
    public readonly person: PersonEntity,
    public readonly socials: CreateSocialMedia[] | null,
    public readonly phones: CreatePhone[] | null
  ) {}

  //validations
}
