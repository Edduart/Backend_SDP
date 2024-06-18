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
          
        const result_individual = await this.getRoleMultiple(result.id, undefined);
        return result_individual[0];
    }
    async GetAllPermissions(): Promise<PermissionEntity[]> {
        const from_db = await prisma.permission.findMany();
        return from_db.map(permiso => PermissionEntity.fromdb(permiso));
    }
    async Update(nuevo: UpdateRoleStruc): Promise<RoleEntity> {
      const exists = await prisma.role.findFirst({
        where: { AND:[
          {name: nuevo.name},
        ], NOT:{id: nuevo.id}}
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
        const result_individual = await this.getRoleMultiple(result.id, undefined);
        return result_individual[0];
    }
    async getRoleMultiple(id: number|undefined,name: string|undefined): Promise<RoleEntity[]> {
      let roles_baseD; 
      /* si ambas variables son undefined se procede con el select all, sin embargo si una de las variables es undefined
      se procede con el filtro, pues prisma controla el undefined como una forma de ignorar dicha comparacion 
      y null como un valor */
      if((id === undefined) && (name === undefined) ){
        roles_baseD = await prisma.role.findMany({
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
                      type: true, 
                      table: true,
                  }
                }
              }
            }
          }
        });
       } else{
        roles_baseD = await prisma.role.findMany({where: {
          OR: [
            {id: id},
            {name: name}
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
                    type: true,
                    table: true,
                }
              }
            }
          }
        }});  
       }
          const roleEntities: RoleEntity[] = roles_baseD.map(rol => {
            const permissions: PermissionEntity[] = rol.role_permission.map(rolePermission => {
              return PermissionEntity.fromdb({
                id:     rolePermission.permission.id,
                name:   rolePermission.permission.name,
                type:   rolePermission.permission.type, 
                table:  rolePermission.permission.table,
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
