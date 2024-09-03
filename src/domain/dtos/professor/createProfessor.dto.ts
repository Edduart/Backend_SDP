import { CreateUserDTO } from "../";

export class CreateProfessor {
  constructor(public readonly user: CreateUserDTO) {}

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
