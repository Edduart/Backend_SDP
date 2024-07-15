import { UserRepository } from "../../repositories/user.repository";

export interface GetUsersByTypeUseCase {
  execute(type: string): Promise<object>;
}

export class GetUsersByType implements GetUsersByTypeUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute(type: string): Promise<object> {
    return this.repository.getByType(type);
  }
}
