import {
  UserEntity,
  UserRepository,
  UserDataSource,
  Login
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) {}
  getAll(): Promise<object> {
    return this.datasource.getAll();
  }
  Login(data: Login): Promise<UserEntity> {
    return this.datasource.Login(data);
  }
  ChangePassword(data: Login): Promise<String> {
    return this.datasource.ChangePassword(data);
  }
}
