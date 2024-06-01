import { RoleDataSource } from "../../domain/datasource/role_datasource";
import { CreateRole } from "../../domain/dtos/role/create-role";
import { UpdateRole } from "../../domain/dtos/role/update_role";
import { RoleEntity } from "../../domain/entities/role.entity";
import { prisma } from "../../data/postgres";
import { PermissionEntity } from "../../domain/entities/permission.entity";
export class RoleDataSourceImpl implements RoleDataSource{
    
    create(): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    Update(): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<RoleEntity[]> {
        const roles_baseD = await prisma.role.findMany({
            select: {
              id: true,
              name: true,
              description:  true,
              role_permission: {
                select: {
                  permission: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                  }
                }
              }
            }
          })

          const roleEntities: RoleEntity[] = roles_baseD.map(rol => {
            const permissions: PermissionEntity[] = rol.role_permission.map(rolePermission => {
              return PermissionEntity.fromdb({
                id: rolePermission.permission.id,
                name: rolePermission.permission.name,
                description: rolePermission.permission.description
              });
            });
        
            return RoleEntity.fromdb({
              id: rol.id,
              name: rol.name,
              description: rol.description,
              premissions: permissions
            });
          });

          return roleEntities
    }
    async getById(id: number): Promise<RoleEntity>{
      const result_db = await prisma.role.findMany({
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          description:  true,
          role_permission: {
            select: {
              permission: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
              }
            }
          }
        }
      })
      const result_enti: RoleEntity[] = result_db.map(rol => {
        const permissions: PermissionEntity[] = rol.role_permission.map(rolePermission => {
          return PermissionEntity.fromdb({
            id: rolePermission.permission.id,
            name: rolePermission.permission.name,
            description: rolePermission.permission.description
          });
        });
    
        return RoleEntity.fromdb({
          id: rol.id,
          name: rol.name,
          description: rol.description,
          premissions: permissions
        });
      });
      if ( !result_db ) throw `Role with id ${ id } not found`;
      return result_enti[0];
    }
    Delete(id: number): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    
}
