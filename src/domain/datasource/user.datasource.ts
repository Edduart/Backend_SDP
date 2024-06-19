import { UserEntity } from "../entities";
//import { DTOs } from "../dtos";

export abstract class UserDataSource {
  //abstract create(dto: ): Promise<UserEntity>;
  abstract getAll(): Promise<UserEntity[]>;
  //abstract findById(id: string): Promise<UserEntity>;
  //abstract updateById(dto: ): Promise<UserEntity>;
  //abstract deleteById(id: number): Promise<UserEntity>;
}
