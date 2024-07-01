import { CreateUserDTO } from "../../../domain";
import { prisma } from "../../../data/postgres";
import { person_BloodType } from "@prisma/client";
import { redes } from "../../../seed/data";


export async function CreateUser(user: CreateUserDTO){
    const check_exist = await prisma.user.findFirst({
        where:{
            person_id: user.person.id
        },select:{
            person_id: true,
        }});
        if(check_exist != null) return;
    try{
        await prisma.$transaction(async (tx) =>{
            //start with creating te person and user
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
                    user:{
                        connectOrCreate:{
                            where: {
                                person_id: user.person.id,
                              },
                              create: {
                                parish_id: user.parish_id,
                                status: true,
                                Role_id: user.role,
                                password: user.password,
                                LastIn: null,
                            },
                        }
                    }
                },
                include:{
                    user: true,
                    
                }
            });
            //if there is degree we create it
            if(user.degree != undefined){
                const degree_json = user.degree.map((actual) =>{
                    return ({user_id: user.person.id,
                        description: actual.description,
                        link: actual.link,})
                });
                await prisma.academic_degree.createMany({
                    data: degree_json
                });
            }
            //if there is media we create it all
            if(user.person.media != null){
                const media_json = user.person.media.map((actual) => {
                    return({
                        person_id: user.person.id,
                        social_media_category: redes.find((item) => item.description === actual.social_media_category)?.id || 1,
                        link: actual.link,
                    });
                });
                await prisma.social_media.createMany({
                    data: media_json
                });
            }
            //if there is cellphones we create it all
            if(user.person.cellphone != null){
                const cell_json = user.person.cellphone?.map((actual) => {
                    return({
                        person_id: user.person.id,
                        phone_number: actual.phone_number,
                        description: actual.phone_number,
                    });
                });
                await prisma.phone_number.createMany({
                    data: cell_json
                })
            }
        });   //transaction
    }catch(error){
        throw new Error("Error creating person" + error);
    }
} 