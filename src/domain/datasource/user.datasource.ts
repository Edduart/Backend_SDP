import { Login } from "../dtos";
import { UserEntity } from "../entities";



export abstract class UserDataSource{
    abstract Login(data: Login): Promise<UserEntity>;
    abstract ChangePassword(data: Login): Promise<String>;
}