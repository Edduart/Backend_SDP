import { prisma } from "../../data/postgres";
import { CreateSubjectDTO, GetSubjectDTO, instruction_dto, SubjectDataSource, SubjectDeliver, SubjectEntity, UpdateSubjectDTO } from "../../domain";

export class SubjectDataSourceImpl implements SubjectDataSource {
    async get_instruction(data: GetSubjectDTO): Promise<SubjectDeliver[]> {
        const result = await prisma.subject.findMany({
            where:{
                AND:{
                    status: data.status,
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
                instruction: true,
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
        const results: SubjectDeliver[] = result.map((subject)=>{
            const subject_actual = SubjectDeliver.fromObject(subject);
            subject_actual.instruction = subject.instruction.map((instructions)=>{
                return instruction_dto.fromObject(instructions);
            });
            return subject_actual;
        });
        
        return results;
    }
    async Delete(id: number): Promise<SubjectEntity> {
        const result = await prisma.subject.findMany({where:{id: id}});
        if (result.length == 0) throw new Error("Subject does not exists");
        const result_p = await prisma.subject.findMany({where:{precedent: id}});
        if (result_p.length > 0) throw new Error("can not delete as it precents: " + result_p[0].description);
        const delete_u = await prisma.subject.update({where:{id:id},data:{status: false}});
        const subjet_deleted = await this.get(GetSubjectDTO.FindDto(delete_u.id, false));
        return subjet_deleted[0];
    }
    async Update(data: UpdateSubjectDTO): Promise<SubjectEntity> {
        const result_u = await prisma.subject.update({
            where:{
                id: data.id,
            },data: data,
        });
        const subjet_created = await this.get(GetSubjectDTO.FindDto(result_u.id));
        return subjet_created[0];
    }
    async get(data: GetSubjectDTO): Promise<SubjectEntity[]> {
        const result = await prisma.subject.findMany({
            where:{
                AND:{
                    status: data.status,
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