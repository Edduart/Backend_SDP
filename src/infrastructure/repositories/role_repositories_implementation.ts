import { CreateRole, RoleDataSource, RoleRepository } from "../../domain";
import { RoleEntity } from "../../domain/entities/role.entity";


export class RoleRepositoryImpl implements RoleRepository{
    constructor (
        private readonly datasource: RoleDataSource,
    ){}
    
    Update(): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<RoleEntity> {
        return this.datasource.getById(id);
    }


    create(): Promise<RoleEntity> {
        return this.datasource.create();
    }
    
    getAll(): Promise<RoleEntity[]> {
        return this.datasource.getAll();
    }
    Delete(id: number): Promise<RoleEntity> {
        return this.datasource.Delete(id);
    }
    
}