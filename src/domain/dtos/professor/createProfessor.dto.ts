import { PersonEntity } from "../../entities";
import { SocialMedia, CreatePhone } from "../";

export class CreateProfessor {
  constructor(
    public readonly person: PersonEntity,
    public readonly socials: SocialMedia[] | null,
    public readonly phones: CreatePhone[] | null
  ) {}


  //validations


}
