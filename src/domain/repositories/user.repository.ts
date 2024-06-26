import { UserEntity } from "../entities";
import { CreateUserDto, Login } from "../dtos";

export abstract class UserRepository {
  abstract create(dto: CreateUserDto): Promise<UserEntity>;
  abstract getAll(): Promise<UserEntity[]>;
  //abstract findById(id: string): Promise<UserEntity>;
  //abstract updateById(dto: ): Promise<UserEntity>;
  //abstract deleteById(id: number): Promise<UserEntity>;

  //abstract Login(data: Login): Promise<UserEntity>;
  //abstract ChangePassword(data: Login): Promise<String>;
}
