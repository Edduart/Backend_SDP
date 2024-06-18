import { Login } from "../dtos";
import { UserEntity } from "../entities";

export abstract class UserRepository{
    abstract Login(data: Login): Promise<UserEntity>;
}