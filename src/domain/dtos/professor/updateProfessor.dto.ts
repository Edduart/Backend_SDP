import { PersonEntity } from "../../entities";
import { CreatePerson, CreateUserDTO, UpdateUserDto } from "../";

export class UpdateProfessorDto {
  constructor(
    public readonly person: CreatePerson,
    public readonly user: UpdateUserDto,
    public readonly status_id: number
  ) {}

  //validations
}
