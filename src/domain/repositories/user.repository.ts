import { Login } from "../dtos";
import { UserEntity } from "../entities";

export abstract class UserRepository {
  abstract Login(data: Login): Promise<UserEntity>;
  abstract ChangePassword(data: Login): Promise<String>;
  abstract getAll(): Promise<object>;
  abstract getById(id: string): Promise<object>;
  abstract getByType(type: string): Promise<object>;
  abstract RestartPassword(id: string): Promise<String>;
}
