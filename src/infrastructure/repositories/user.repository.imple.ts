import {
  UserEntity,
  UserRepository,
  UserDataSource
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) {}

  getAll(): Promise<UserEntity[]> {
    return this.datasource.getAll();
  }
}
