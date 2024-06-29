import { basic_worker_job_position, person_BloodType } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { CreateWorker, BloodType,Job_Psotion_Enum, PersonEntity, PhoneEntity, SocialMediaCategoryEntity, SocialMediaEntity, WorkerDataSource, WorkerEntity } from "../../domain";
export class WorkerDataSourceImpl implements WorkerDataSource{
    async GetSocial(): Promise<SocialMediaCategoryEntity[]> {
        const socials = await prisma.social_media_category.findMany({});
        const social_cate: SocialMediaCategoryEntity[] = socials.map(sociales => {
            return SocialMediaCategoryEntity.fromdb({
                id:         sociales.id,
                description:  sociales.description,
                icon: sociales.icon,
            });
        });
        return social_cate;
    }
    async Update(data: CreateWorker): Promise<WorkerEntity> {
        const reslut_trans = await prisma.$transaction(async (tx) => {
            const exists = await prisma.person.findFirst({
                where: { id: data.persona.id }
              })
              if(exists){
                
              }else{
                throw `Usuario no encontrado`;
              }
            const perona_actualizar = await prisma.person.update({
                where:{
                    id: data.persona.id
                },
                data:{
                    forename:                   data.persona.forename,
                    surname:                    data.persona.surname,
                    birthdate:                  data.persona.birthdate,
                    profile_picture_path:       data.persona.profile_picture_path,
                    email:                      data.persona.email,
                    medical_record:             data.persona.medical_record,
                    BloodType:                  data.persona.Blood as person_BloodType,
                }
            });
            
            if(data.social != null){
                await prisma.social_media.deleteMany({
                    where:{
                        person_id: data.persona.id
                    }
                })
                const data_social = data.social.map(social => {
                    return {
                        person_id:              data.persona.id,
                        social_media_category:  social.social_Cate,
                        link:                   social.link
                    }
                });
                    /*await prisma.social_media.createMany({
                        data: data_social
                    });*/
                }

                if(data.telefono != null){
                    await prisma.phone_number.deleteMany({
                        where:{
                            person_id: data.persona.id,
                        }
                    });
                    const data_telefono = data.telefono.map(celular => {
                        return{
                            person_id:              data.persona.id,
                            phone_number:           celular.phone_number,
                            description:            celular.description,
                        }
                    })
                    await prisma.phone_number.createMany({
                        data: data_telefono
                    });
                }
                await prisma.basic_worker.update({
                    where:{
                        person_id: perona_actualizar.id,
                    },
                    data:{
                        job_position:   data.job_position as basic_worker_job_position
                    }
                });
                return await this.get(perona_actualizar.id, undefined);
        });
        return reslut_trans[0];
    }

    async Delete(id: string): Promise<string> {
        await prisma.$transaction(async (tx) =>{
            await prisma.phone_number.deleteMany({
                where:{
                    person_id: id
                }
            });
            await prisma.social_media.deleteMany({
                where:{
                    person_id: id
                }
            })
            await prisma.basic_worker.delete({
                where:{
                    person_id:id
                }
            });
            await prisma.person.delete({
                where:{
                    id: id
                }
            });
        })
        return("Trabajador eliminado");
    }
    async create(spers: CreateWorker): Promise<WorkerEntity> {
        const result_individual = await prisma.$transaction(async (tx) => {
            const exists = await prisma.person.findFirst({
                where: { id: spers.persona.id }
              })
              if(exists){
                throw `Usuario ya tiene un nombre registrado`;
              }
                const presona_realizar = await prisma.person.create({
                    data: {
                        id:                         spers.persona.id,
                        forename:                   spers.persona.forename,
                        surname:                    spers.persona.surname,
                        birthdate:                  spers.persona.birthdate,
                        profile_picture_path:       spers.persona.profile_picture_path,
                        email:                      spers.persona.email,
                        medical_record:             spers.persona.medical_record,
                        BloodType:                  spers.persona.Blood as person_BloodType,
                    }});
                if(spers.social != null){
                /*const data_social = spers.social.map(social => {
                    return {
                        person_id:              presona_realizar.id,
                        social_media_category:  social.social_media_category,
                        link:                   social.link
                    }
                });
                    await prisma.social_media.createMany({
                        data: data_social
                    });*/
                }
                if(spers.telefono != null){
                    const data_telefono = spers.telefono.map(celular => {
                        return{
                            person_id:              presona_realizar.id,
                            phone_number:           celular.phone_number,
                            description:            celular.description,
                        }
                    })
                    await prisma.phone_number.createMany({
                        data: data_telefono
                    });
                }
                await prisma.basic_worker.create({
                    data:{
                        person_id:                  presona_realizar.id,
                        job_position:               spers.job_position as basic_worker_job_position
                    }
                });
                return await this.get(presona_realizar.id, undefined);
            })
            return result_individual[0];
    }

    async get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]> {
        /* si ambas variables son undefined se procede con el select all, sin embargo si una de las variables es undefined
      se procede con el filtro, pues prisma controla el undefined como una forma de ignorar dicha comparacion 
      y null como un valor */
        let retunrFromDB;
        if((id_re === undefined) && (puesto === undefined)){
            retunrFromDB = await prisma.person.findMany({
                select:{
                    id:                     true,
                    profile_picture_path:   true,
                    forename:               true,
                    surname:                true,
                    email:                  true,
                    birthdate:              true,
                    medical_record:         true,
                    BloodType:              true,
                    phone_number:{
                        select:{
                            phone_number:   true,
                            description:    true,
                        }
                    },
                    social_media:{
                        select:{
                            link:           true,
                            //Esta es la llave de relacion generada por prisma automaticamente, por ello el nombre extraño, por favor ignorarlo
                            social_media_category_social_media_social_media_categoryTosocial_media_category:{
                                select:{
                                description:true,
                                }
                            }
                        }
                    },
                    basic_worker:{
                        select:{
                            job_position:   true
                        }
                    }
                }
            });
        }else{
            retunrFromDB = await prisma.person.findMany({
                where:{
                    OR:[
                        {id: id_re},
                        {
                            basic_worker: {
                                job_position: puesto
                            }
                        }
                    ]
                },
                select:{
                    id:                     true,
                    profile_picture_path:   true,
                    forename:               true,
                    surname:                true,
                    email:                  true,
                    birthdate:              true,
                    medical_record:         true,
                    BloodType:              true,
                    phone_number:{
                        select:{
                            phone_number:   true,
                            description:    true,
                        }
                    },
                    social_media:{
                        select:{
                            link:           true,
                            //Esta es la llave de relacion generada por prisma automaticamente, por ello el nombre extraño, por favor ignorarlo
                            social_media_category_social_media_social_media_categoryTosocial_media_category:{
                                select:{
                                description:true,
                                }
                            }
                        }
                    },
                    basic_worker:{
                        select:{
                            job_position:   true
                        }
                    }
                }
            });
        }
        

        const workers: WorkerEntity[] = retunrFromDB.map(Worker => {
            //creo a la persona otra cosa, worker es basicamente persona debido a que el select empezó por persona
            const person: PersonEntity = PersonEntity.fromdb({
                id:                     Worker.id, 
                profile_picture_path:   Worker.profile_picture_path,
                forename:                   Worker.forename,
                surname:                Worker.surname,
                email:                  Worker.email,
                fecha:                  Worker.birthdate,
                medical_record:         Worker.medical_record,
                BloodType:              Worker.BloodType as BloodType
            });
            const phones: PhoneEntity[] = Worker.phone_number.map(phoneatributer =>{
                //creo los arrays de telefonos, en caso de que existan
                return PhoneEntity.fromdb({
                    id:             null, 
                    phone_number:   phoneatributer.phone_number,
                    person_id:      null, 
                    description:    phoneatributer.description
                });
            });
            const socials: SocialMediaEntity[] = Worker.social_media.map(sociales => {
                //ahora creo el array de redes sociales, en caso de que existan
                return SocialMediaEntity.fromdb({
                    id:         null,
                    person_id:  null,
                    //esta tira es debido al nombre de la relacion
                    social_Cate: sociales.social_media_category_social_media_social_media_categoryTosocial_media_category.description,
                    link:       sociales.link
                });
            });
            //ahora si a crear la entidad trabajador
            return WorkerEntity.fromdb(person, socials, phones, Worker.basic_worker?.job_position as Job_Psotion_Enum);

        });

        return workers;
    }

}