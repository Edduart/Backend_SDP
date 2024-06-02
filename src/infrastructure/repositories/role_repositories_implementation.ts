import { CreateRole, RoleDataSource, RoleRepository } from "../../domain";
import { PermissionEntity } from "../../domain/entities/permission.entity";
import { RoleEntity } from "../../domain/entities/role.entity";


export class RoleRepositoryImpl implements RoleRepository{
    constructor (
        private readonly datasource: RoleDataSource,
    ){}
    
    Update(nuevo: RoleEntity): Promise<RoleEntity> {
        return this.datasource.Update(nuevo);
    }
    getById(id: number): Promise<RoleEntity> {
        return this.datasource.getById(id);
    }

    GetAllPermissions(): Promise<PermissionEntity[]> {
        return this.datasource.GetAllPermissions();
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