import { UserRepository } from "../../repositories/user.repository";

export interface GetUserByIdUseCase {
  execute(id: string): Promise<object>;
}

export class GetUserbyId implements GetUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute(id: string): Promise<object> {
    return this.repository.getById(id);
  }
}
