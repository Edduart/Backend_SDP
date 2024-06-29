import { CreateUserDTO } from "../../../domain";
import { prisma } from "../../../data/postgres";
import { person_BloodType } from "@prisma/client";
import { redes } from "../../../seed/data";


export async function CreateUser(user: CreateUserDTO){

    try{
        await prisma.$transaction(async (tx) =>{
            //se obtiene el numero del rol
            const role_id = await prisma.role.findFirst({
                where:{
                    name: user.role,
                }, select:{
                    id: true,
                }
            });
            //se obtiene el numero de la parroquia
            const parish_id = await prisma.parish.findFirst({
                where:{
                    name: user.parish_name
                }, select: {
                    id: true,
                }
            });
            //si no se encuentra se manda error
            if(role_id == null)     throw new Error("Role not found");
            if(parish_id == null)   throw new Error("Parish not found");
            //si tiene certificados se crea el array de data
            const degree_json = user.degree!.map((actual) =>{
                return ({user_id: user.person.id,
                    description: actual.description,
                    link: actual.link,})
            });
            //si tiene media lo vuelve un array
            const media_json = user.person.media!.map((actual) => {
                return({
                    person_id: user.person.id,
                    social_media_category: redes.find((item) => item.description === actual.social_media_category)?.id || 1,
                    link: actual.link,
                });
            });
            const cell_json = user.person.cellphone!.map((actual) => {
                return({
                    person_id: user.person.id,
                    phone_number: actual.phone_number,
                    description: actual.phone_number,
                });
            });
            const result_op = await prisma.person.create({
                data:{
                    id:                         user.person.id,
                    forename:                    user.person.forename,
                    surname:                     user.person.surname,
                    birthdate:                   user.person.birthdate,
                    profile_picture_path:        user.person.profile_picture_path,
                    email:                       user.person.email,
                    medical_record:              user.person.medical_record,
                    BloodType:                   user.person.Blood as person_BloodType,
                    social_media:{
                        createMany: {
                            data: media_json
                        },
                    },
                    phone_number:{
                        createMany:{
                            data: cell_json
                        },
                    },
                    user:{
                        connectOrCreate:{
                            where: {
                                person_id: user.person.id,
                              },
                              create: {
                                parish_id: parish_id?.id,
                                status: true,
                                Role_id: role_id.id,
                                password: user.password,
                                LastIn: null,
                                academic_degree: {
                                    createMany: {
                                        data: degree_json,
                                    }
                                },
                            },
                        }
                    }
                },
                include:{
                    user: {

                        include:{
                            academic_degree: true,
                        }
                    },
                    social_media: true,
                    phone_number: true,
                    
                }
            });
        });
        
    }catch(error){
        throw new Error("Error creating person" + error);
    }
} 