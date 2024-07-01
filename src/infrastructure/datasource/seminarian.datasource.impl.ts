import { foreigner_seminarian_stage, seminarian_Location, seminarian_Ministery, seminarian_status } from "@prisma/client";
import { CreateUser } from ".";
import { prisma } from "../../data/postgres";
import { CreateSeminarian, SeminarianDataSource } from "../../domain";

export class SeminarianDataSourceImpl implements SeminarianDataSource{
    async create(data: CreateSeminarian): Promise<string> {
        try{
            await CreateUser(data.user);
            //creating foreing
            if(data.foreing_Data != undefined){
                //call to create if foreing data 
                console.log("creating foreing user:" + data.foreing_Data)
                const result = await prisma.seminarian.create({
                    data:{
                        id: data.user.person.id,
                        apostleships: data.apostleships,
                        status: seminarian_status.Activo,
                        Location: data.location as seminarian_Location,
                        Ministery: data.ministery as seminarian_Ministery,
                        foreigner_seminarian:{
                            connectOrCreate:{
                                where:{
                                    id: data.user.person.id,
                                }, create:{
                                    seminary_name: data.foreing_Data.seminary_name,
                                    stage: data.foreing_Data.stage as unknown as foreigner_seminarian_stage,
                                    stage_year: data.foreing_Data.stage_year,
                                }
                            }
                        }
                    },include:{
                        foreigner_seminarian: true,
                    }
                });
                return result.id;
            }
            //create for not foreing seminarians
            console.log("creating normal user:" + data.foreing_Data)
            const result = await prisma.seminarian.create({
                data:{
                    id: data.user.person.id,
                    apostleships: data.apostleships,
                    status: seminarian_status.Activo,
                    Location: data.location as seminarian_Location,
                    Ministery: data.ministery as seminarian_Ministery,
                }
            });
            return result.id;
        }catch(error){
            throw new Error("Unable to create seminarian" + error);
        }
    }
}