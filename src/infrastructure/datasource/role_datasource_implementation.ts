import { RoleDataSource } from "../../domain/datasource/role_datasource";
import { CreateRole } from "../../domain/dtos/role/create-role";
import { UpdateRole } from "../../domain/dtos/role/update_role";
import { RoleEntity } from "../../domain/entities/role.entity";
import { prisma } from "../../data/postgres";
export class RoleDataSourceImpl implements RoleDataSource{
    
    create(permisos: number[]): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    Update(permisos: number[]): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<RoleEntity[]> {
        const roles = await prisma.role.findMany();

        return roles.map(Role => RoleEntity.fromdb(Role)); 
    }
    Delete(id: number): Promise<RoleEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}