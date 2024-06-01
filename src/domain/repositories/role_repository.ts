import { RoleEntity } from "../entities/role.entity";
//en este archivo se copia y pega todo lo del datasource
export abstract class RoleRepository{
    abstract create( permisos: number[]): Promise<RoleEntity>;
    abstract getAll(): Promise<RoleEntity[]>;
    abstract Delete(id: number): Promise<RoleEntity[]>;
}