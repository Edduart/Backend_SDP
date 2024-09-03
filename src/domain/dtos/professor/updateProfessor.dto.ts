import { PersonEntity } from "../../entities";
import { CreatePerson, CreateUserDTO, UpdateUserDto } from "../";

export class UpdateProfessorDto {
  constructor(
    public readonly person: CreatePerson,
    public readonly user: UpdateUserDto
  ) {}

  public DataValidation(): string | null {
    let error: string[] = [];
    const validation = this.person.Validate();
    if (validation != null) error.push(validation);
    if (error.length > 0) {
      return error.join(", ");
    }
    return null;
  }
}
