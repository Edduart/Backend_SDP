import { CreateUserDTO } from "../";

export class CreateProfessor {
  constructor(public readonly user: CreateUserDTO) {}

  public Validate(): string | null {
    let error: string[] = [];
    const result_user = this.user.Validate();
    if (result_user != null) {
      error.push(result_user);
    }
    if (error.length > 0) {
      return error.join(", ");
    }
    return null;
  }
}
