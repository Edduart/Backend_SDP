import { UserEntity } from "../entities";
import { CreateUserDto } from "../dtos";

export abstract class UserDataSource {
  abstract create(dto: CreateUserDto): Promise<UserEntity>;
  abstract getAll(): Promise<UserEntity[]>;
  //abstract findById(id: string): Promise<UserEntity>;
  //abstract updateById(dto: ): Promise<UserEntity>;
  //abstract deleteById(id: number): Promise<UserEntity>;
}
import { Login } from "../dtos";
import { UserEntity } from "../entities";



export abstract class UserDataSource{
    abstract Login(data: Login): Promise<UserEntity>;
    abstract ChangePassword(data: Login): Promise<String>;
}