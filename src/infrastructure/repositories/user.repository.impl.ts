import { Login, UserDataSource, UserEntity, UserRepository } from "../../domain";

export class UserRepositoryImplementation implements UserRepository{
    constructor (
        private readonly datasource: UserDataSource,
    ){}
    Login(data: Login): Promise<UserEntity> {
        return this.datasource.Login(data);
    }
    
}