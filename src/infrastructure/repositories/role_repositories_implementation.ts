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


    create(name: string, description: string, numbers: number[]): Promise<RoleEntity> {
        return this.datasource.create(name, description, numbers);
    }
    
    getAll(): Promise<RoleEntity[]> {
        return this.datasource.getAll();
    }
    Delete(id: number) {
        return this.datasource.Delete(id);
    }
    
}