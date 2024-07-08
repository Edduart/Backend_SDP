import { Login } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface ChangeUseCase{
    execute(data: Login): Promise<String>;
}

export class Change_use implements ChangeUseCase {
    constructor(private readonly repository: UserRepository) {}
    execute(data: Login): Promise<String> {
      return this.repository.ChangePassword(data);
    }
}