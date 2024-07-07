import {
  UserEntity,
  UserRepository,
  UserDataSource,
  CreateUserDto
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) {}

  create(dto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create(dto);
  }

  getAll(): Promise<UserEntity[]> {
    return this.datasource.getAll();
  }
}
