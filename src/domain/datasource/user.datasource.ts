import { UserEntity } from "../entities";
import { CreateUserDto, Login } from "../dtos";

export abstract class UserDataSource {
  abstract Login(data: Login): Promise<UserEntity>;
  abstract ChangePassword(data: Login): Promise<String>;
  abstract getAll(): Promise<object>;
  abstract getById(id: string): Promise<object>;
  abstract getByType(type: string): Promise<object>;
}

