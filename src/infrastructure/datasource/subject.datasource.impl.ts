import { prisma } from "../../data/postgres";
import { CreateSubjectDTO, GetSubjectDTO, SubjectDataSource, SubjectEntity } from "../../domain";

export class SubjectDataSourceImpl implements SubjectDataSource {
    async get(data: GetSubjectDTO): Promise<SubjectEntity[]> {
        const result = await prisma.subject.findMany({
            where:{
                AND:{
                    description: {
                        contains: data.description
                    },
                    id: data.id,
                    course_id: data.course_id,
                    academic_field:{
                        id: data.academic_field_id,
                        stage_id: data.stage_id,
                    }
                }
            },
            include:{
                course:true,
                academic_field: {
                    include: {
                        stage: true,
                    }
                },
                subject:{
                    include:{
                        academic_field: {
                            include:{
                                stage: true
                            }
                        }
                    }
                }}});
                console.log(result.length)
                console.log(result)
            const results: SubjectEntity[] = result.map((subject)=>{
                return SubjectEntity.fromObject(subject);
            });
            return results;
    }
    async create(data: CreateSubjectDTO): Promise<SubjectEntity> {
        const result = await prisma.subject.create({
            data: data,
        });
        const subjet_created = await this.get(GetSubjectDTO.FindDto(result.id));
        return subjet_created[0];
    }
}