import { person_BloodType } from "@prisma/client";
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
        })
        
        throw new Error("Method not implemented.");
    }


}