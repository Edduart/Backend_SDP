import { prisma } from "../../data/postgres";
import { Login, UserDataSource, UserEntity } from "../../domain";

export class UserDataSourceImplementation implements UserDataSource{
    async Login(data: Login): Promise<UserEntity> {
        const Usuario_db = await prisma.user.findMany({
            where:{
                person_id: data.person_id
            },
            select:{
                person_id:  true,
                status:     true,
                role: {
                    select:{
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
        
        throw new Error("Method not implemented.");
    }
}