import { UserRepository } from "../../repositories/user.repository";

export interface GetUsersUseCase {
  execute(): Promise<object>;
}

export class GetUsers implements GetUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute(): Promise<object> {
    return this.repository.getAll();
  }
}
