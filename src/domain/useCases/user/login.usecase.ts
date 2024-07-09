import { Login } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface LoginUseCase{
    execute(data: Login): Promise<UserEntity>;
}

export class Login_Use implements LoginUseCase {
    constructor(private readonly repository: UserRepository) {}
  
    execute(data: Login): Promise<UserEntity> {
      return this.repository.Login(data);
    }
}