import { CreateRoleStruc } from "../dtos";
import { PermissionEntity } from "../entities/permission.entity";
import { RoleEntity } from "../entities/role.entity";
//en este archivo se copia y pega todo lo del datasource
export abstract class RoleRepository{
    abstract create(data: CreateRoleStruc): Promise<RoleEntity>;
    abstract Update(nuevo: CreateRoleStruc): Promise<RoleEntity>;
    abstract getRoleMultiple(id: number|undefined,name: string|undefined): Promise<RoleEntity[]>;
    abstract Delete(id: number): Promise<null>;
    abstract GetAllPermissions(): Promise <PermissionEntity[]>;
}