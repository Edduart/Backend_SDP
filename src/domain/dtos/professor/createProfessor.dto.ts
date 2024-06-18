import { PersonEntity } from "../../entities";
import { SocialMedia, CreatePhone } from "../";

export class CreateProfessor {
  constructor(
    public readonly persona: PersonEntity,
    public readonly social: SocialMedia[] | null,
    public readonly telefono: CreatePhone[] | null
  ) {}
}
