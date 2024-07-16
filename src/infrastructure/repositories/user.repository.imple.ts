import {
  UserEntity,
  UserRepository,
  UserDataSource,
  Login
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) {}
  getById(id: string): Promise<object> {
    return this.datasource.getById(id);
  }
  getByType(type: string): Promise<object> {
    return this.datasource.getByType(type);
  }
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
