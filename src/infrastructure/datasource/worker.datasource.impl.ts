import { basic_worker_job_position, person_BloodType } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { CreateWorker, WorkerDataSource, WorkerEntity } from "../../domain";

export class WorkerDataSourceImpl implements WorkerDataSource{
    create(spers: CreateWorker): Promise<WorkerEntity> {
        
        prisma.$transaction(async (tx) => {
            const presona_realizar = await prisma.person.create({
                data: {
                    id: spers.persona.id,
                    forename: spers.persona.forename,
                    surname: spers.persona.surname,
                    birthdate: spers.persona.birthdate,
                    email: spers.persona.email,
                    medical_record: spers.persona.medical_record,
                    BloodType: spers.persona.BloodType as person_BloodType,
                }});
            if(spers.social != null){
                await prisma.social_media.create({
                    data:{
                        person_id: presona_realizar.id,
                        social_media_category: spers.social.social_media_category,
                        link: spers.social.link,
                    }
                });
            }
            if(spers.telefono != null){
                await prisma.phone_number.create({
                    data:{
                        person_id: presona_realizar.id,
                        phone_number: spers.telefono.phone_numbre,
                        description: spers.telefono.description,
                    }
                });
            }
            await prisma.basic_worker.create({
                data:{
                    person_id: presona_realizar.id,
                    job_position: spers.job_position as basic_worker_job_position
                }
            });
        })
        
        throw new Error("Method not implemented.");
    }

    get(id: number): Promise<WorkerEntity[]> {
        
        
        
        throw new Error("Method not implemented.");
    }

}