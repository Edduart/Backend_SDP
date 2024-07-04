import { basic_worker_job_position, person_BloodType } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { CreateWorker, BloodType,Job_Psotion_Enum, PersonEntity, PhoneEntity, SocialMediaCategoryEntity, SocialMediaEntity, WorkerDataSource, WorkerEntity } from "../../domain";
import { User_utilities } from "..";
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
                where: { id: data.persona.id }});
            if(exists){}else{throw `worker not found`;}
            await User_utilities.UpdatePersonFunc(data.persona);
            const perona_actualizar = prisma.basic_worker.update({
                where: {
                    person_id: data.persona.id,
                },data:{
                    job_position: data.job_position as basic_worker_job_position
                }
            });
            return await this.get(data.persona.id, undefined);
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
        return("worker deleted");
    }
    async create(spers: CreateWorker): Promise<WorkerEntity> {
        const result_individual = await prisma.$transaction(async (tx) => {
            //first i check if the person exist, if exist throw error
            const exists = await prisma.person.findFirst({
                where: { id: spers.persona.id }
              })
              if(exists){
                throw `Usuario ya tiene un nombre registrado`;
              }
              //now i create the person
              await User_utilities.CreatePersonFunc(spers.persona);
              //now i create the basic worker
                await prisma.basic_worker.create({
                    data:{
                        person_id:                  spers.persona.id,
                        job_position:               spers.job_position as basic_worker_job_position
                    }
                });
                return await this.get(spers.persona.id, undefined);
            })
            return result_individual[0];
    }

    async get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]> {
        const retunrFromDB = await prisma.person.findMany({
            where:{
                AND:[
                    {id: id_re},
                    {
                        basic_worker: {
                            job_position: puesto
                        }
                    },
                    {basic_worker:{
                        isNot: null,
                    }}
                ]
            },
            include:{
                phone_number: true,
                social_media:{
                    include:{
                        social_media_category_social_media_social_media_categoryTosocial_media_category: true,
                    }
                },
                basic_worker:true,
            }
        });
        

        const workers: WorkerEntity[] = retunrFromDB.map(Worker => {
            //creo a la persona otra cosa, worker es basicamente persona debido a que el select empezó por persona
            const person: PersonEntity = PersonEntity.fromdb({
                id:                     Worker.id, 
                profile_picture_path:   Worker.profile_picture_path,
                forename:               Worker.forename,
                surname:                Worker.surname,
                email:                  Worker.email,
                fecha:                  Worker.birthdate,
                medical_record:         Worker.medical_record,
                BloodType:              Worker.BloodType as BloodType
            });
            const phones: PhoneEntity[] = Worker.phone_number.map(phoneatributer =>{
                //creo los arrays de telefonos, en caso de que existan
                return PhoneEntity.fromdb({
                    phone_number:   phoneatributer.phone_number,
                    description:    phoneatributer.description
                });
            });
            const socials: SocialMediaEntity[] = Worker.social_media.map(sociales => {
                //ahora creo el array de redes sociales, en caso de que existan
                return SocialMediaEntity.fromdb({
                    //esta tira es debido al nombre de la relacion
                    social_Cate: sociales.social_media_category_social_media_social_media_categoryTosocial_media_category.description,
                    link:       sociales.link
                });
            });
            person.cellpones = phones;
            person.medias = socials;
            //ahora si a crear la entidad trabajador
            return WorkerEntity.fromdb(person, Worker.basic_worker?.job_position as Job_Psotion_Enum);

        });

        return workers;
    }

}