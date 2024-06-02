import { RoleDataSource } from "../../domain/datasource/role_datasource";
import { UpdateRole_struc } from "../../domain/dtos/role/update_role";
import { RoleEntity } from "../../domain/entities/role.entity";
import { prisma } from "../../data/postgres";
import { PermissionEntity } from "../../domain/entities/permission.entity";
import { CreateRole_Struc } from "../../domain/dtos";
export class RoleDataSourceImpl implements RoleDataSource{
    
    async create(sper: CreateRole_Struc): Promise<RoleEntity> {
        const result = await prisma.role.create({
          data:{
            name: sper.name,
            description: sper.description,
          }
        });
        const data = sper.numbers.map((number) => {
          return { role_id: result.id, permission_id: number }
        })
          await prisma.role_permission.createMany({
            data: data
          })
        const result_individual = this.getById(result.id);

        return (result_individual);
    }
    async GetAllPermissions(): Promise<PermissionEntity[]> {
        const from_db = await prisma.permission.findMany();
        return from_db.map(permiso => PermissionEntity.fromdb(permiso));
    }
    async Update(nuevo: UpdateRole_struc): Promise<RoleEntity> {
      await prisma.role_permission.deleteMany({
        where:{
          role_id: nuevo.id
        }
      })
      const result = await prisma.role.update({
        where: { id: nuevo.id },
        data: {name: nuevo.name, description: nuevo.description}
      });
      const data = nuevo.numbers.map((number) => {
        return { role_id: result.id, permission_id: number }
      })
        await prisma.role_permission.createMany({
          data: data
        })
      const result_individual = this.getById(result.id);
      return result_individual;
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
    async Delete(id: number): Promise<null> {
        await prisma.role_permission.deleteMany({
          where:{
            role_id: id
          }
        })
        await prisma.role.delete({
          where:{
            id: id
          }
        })
      
      return null;
    }
}
