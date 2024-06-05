import { prisma } from "../../data/postgres";
import {
  RoleDataSource,
  UpdateRoleStruc,
  RoleEntity,
  PermissionEntity,
  CreateRoleStruc,
} from "../../domain";
export class RoleDataSourceImpl implements RoleDataSource{
    
    async create(sper: CreateRoleStruc): Promise<RoleEntity> {
      const exists = await prisma.role.findFirst({
        where: { name: sper.name }
      })
      if(exists){
        throw `Usuario ya tiene un nombre registrado`;
      }
      console.log("Pollo")
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
          
        const result_individual = this.getOne(result.id, "None");
        return (result_individual);
    }
    async GetAllPermissions(): Promise<PermissionEntity[]> {
        const from_db = await prisma.permission.findMany();
        return from_db.map(permiso => PermissionEntity.fromdb(permiso));
    }
    async Update(nuevo: UpdateRoleStruc): Promise<RoleEntity> {
      const exists = await prisma.role.findFirst({
        where: { name: nuevo.name }
      })
      if(exists){
        throw `Usuario ya tiene un nombre registrado`;
      }
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
      const result_individual = this.getOne(result.id, "None");
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
    async getOne(id: number,namesur: string): Promise<RoleEntity> {
      if(id === null){
        id = 0;
      }else{
        namesur = "None"
      }
      console.log(id, namesur)
      const result_db = await prisma.role.findMany({where: {
        OR: [
          {id: id,},
          {name: namesur}
        ]
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
      }})  
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
      if ( !result_db ) throw `Role with not found`;
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
