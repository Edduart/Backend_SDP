import { CreateUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export interface CreateUserUseCare {
  execute(dto: CreateUserDto): Promise<UserEntity>;
}

export class CreateUser implements CreateUserUseCare {
  constructor(private readonly repository: UserRepository) {}

  execute(dto: CreateUserDto): Promise<UserEntity> {
    return this.repository.create(dto);
  }
}
