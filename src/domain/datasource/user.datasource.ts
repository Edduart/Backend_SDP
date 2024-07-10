import { UserEntity } from "../entities";
import { CreateUserDto, Login } from "../dtos";

export abstract class UserDataSource {
  abstract Login(data: Login): Promise<UserEntity>;
  abstract ChangePassword(data: Login): Promise<String>;
  abstract getAll(): Promise<object>;
}

