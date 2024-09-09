import { CreateUserDTO, CreateInstructorDto } from "../";
import { instructor_position } from "@prisma/client";
export class CreateProfessor {
  constructor(
    public readonly user: CreateUserDTO,
    public instructor_position?: instructor_position
  ) {}

  public Validate(): string | null {
    let error: string[] = [];
    const userValidation = this.user.Validate();
    if (userValidation != null) {
      error.push(userValidation);
    }

    if (error.length > 0) {
      return error.join(", ");
    }
    return null;
  }
}
