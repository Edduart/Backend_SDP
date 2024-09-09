import { instructor_position } from "@prisma/client";
import { CreatePerson, UpdateUserDto } from "../";

export class UpdateProfessorDto {
  constructor(
    public person: CreatePerson,
    public user: UpdateUserDto,
    public instructor_position?: instructor_position
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
