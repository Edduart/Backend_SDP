import { prisma } from "../../data/postgres";
import { Login, PermissionEntity, UserDataSource, UserEntity } from "../../domain";

export class UserDataSourceImplementation implements UserDataSource{
    async Login(data: Login): Promise<UserEntity> {
        const Usuario_db = await prisma.user.findMany({
            where:{
                AND:[
                    {person_id: data.person_id},
                    {status: true}
                ]
            },
            select:{
                person_id:  true,
                password:   true,
                status:     true,
                role: {
                    select:{
                        id: true,
                        role_permission: {
                            select:{
                                permission:{
                                    select:{
                                        id:     true,
                                        name:   true,
                                        table:  true,
                                        type:   true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        const resultado: UserEntity[] = Usuario_db.map(usuario =>{
            const Permisos: PermissionEntity[] = usuario.role.role_permission.map(permiso_vuelta => {
                return PermissionEntity.fromdb({
                    id: permiso_vuelta.permission.id, 
                    name: permiso_vuelta.permission.name,
                    type: permiso_vuelta.permission.type, 
                    table: permiso_vuelta.permission.table
                });
            });
            return new UserEntity(usuario.person_id, Permisos, usuario.password, true);
        });
        return resultado[0];
    }
}