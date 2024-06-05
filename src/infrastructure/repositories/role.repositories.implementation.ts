import { CreateRoleStruc, RoleDataSource, RoleRepository, UpdateRoleStruc } from "../../domain";
import { PermissionEntity } from "../../domain/entities/permission.entity";
import { RoleEntity } from "../../domain/entities/role.entity";


export class RoleRepositoryImpl implements RoleRepository{
    constructor (
        private readonly datasource: RoleDataSource,
    ){}
    
    Update(nuevo: UpdateRoleStruc): Promise<RoleEntity> {
        return this.datasource.Update(nuevo);
    }
    getOne(id: number|null,name: string|null): Promise<RoleEntity> {
        return this.datasource.getOne(id,name);
    }

    GetAllPermissions(): Promise<PermissionEntity[]> {
        return this.datasource.GetAllPermissions();
    }
    create(data: CreateRoleStruc): Promise<RoleEntity> {
        return this.datasource.create(data);
    }
    
    getAll(): Promise<RoleEntity[]> {
        return this.datasource.getAll();
    }
    Delete(id: number) {
        return this.datasource.Delete(id);
    }
    
}