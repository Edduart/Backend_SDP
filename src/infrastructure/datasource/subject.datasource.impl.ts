import { prisma } from "../../data/postgres";
import { CreateSubjectDTO, SubjectDataSource, SubjectEntity } from "../../domain";

export class SeminarianDataSourceImpl implements SubjectDataSource {
    async get(): Promise<SubjectEntity[]> {
        const result = await prisma.subject.findMany({
            
            include:{
                course:true,
                academic_field: {
                    include: {
                        stage: true,
                    }
                },
                subject: true

            }
        });
        throw new Error("Method not implemented.");
    }


    async create(data: CreateSubjectDTO): Promise<SubjectEntity> {

        const result = await prisma.subject.create({
            data: data,
        });


        throw new Error("Method not implemented.");
    }
}