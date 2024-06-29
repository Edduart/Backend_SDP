import { seminarian_Location, seminarian_Ministery, seminarian_status } from "@prisma/client";
import { CreateUser } from ".";
import { prisma } from "../../data/postgres";
import { CreateSeminarian, SeminarianDataSource } from "../../domain";

export class SeminarianDataSourceImpl implements SeminarianDataSource{
    async create(data: CreateSeminarian): Promise<string> {
        try{
            await CreateUser(data.user);
            //si es foraneo se crea la data
            const foreing_json = {
                seminary_name: data.foreing_Data?.seminary_name,

            };
            const result = await prisma.seminarian.create({
                data:{
                    id: data.user.person.id,
                    apostleships: data.apostleships,
                    status: data.status as seminarian_status,
                    Location: data.location as seminarian_Location,
                    Ministery: data.ministery as seminarian_Ministery,
                    foreigner_seminarian:{
                    }
                },include:{
                    foreigner_seminarian: data.foreing_Data != null,
                }
            });


            throw new Error("Unable to create seminarian");
        }catch(error){
            throw new Error("Unable to create seminarian" + error);
        }
    }
}