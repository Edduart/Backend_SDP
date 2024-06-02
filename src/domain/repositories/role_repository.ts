import { PermissionEntity } from "../entities/permission.entity";
import { RoleEntity } from "../entities/role.entity";
//en este archivo se copia y pega todo lo del datasource
export abstract class RoleRepository{
    abstract create(name: string, description: string, numbers: number[]): Promise<RoleEntity>;
    abstract Update(nuevo: RoleEntity): Promise<RoleEntity>;
    abstract getAll(): Promise<RoleEntity[]>;
    abstract getById(id: number): Promise<RoleEntity>;
    abstract Delete(id: number): Promise<null>;
    abstract GetAllPermissions(): Promise <PermissionEntity[]>;
}