import { prisma } from "../../data/postgres";
import { CreateInstruction, GetInstruction, InstructionDatasource, InstructionEntity } from "../../domain";

export class InstructionDataSourceImple implements InstructionDatasource{
    async Update(data: CreateInstruction): Promise<InstructionEntity> {
        const check_exists = await prisma.instruction.findFirst({
            where:{
                subject_id:         data.subject_id,
                academic_term_id:   data.academic_term_id
        }});
        if(check_exists != null)throw new Error("Instruction does not exists");
        const result_created = await prisma.instruction.update({
            where:{
                subject_id_academic_term_id: {
                    subject_id: data.subject_id,
                    academic_term_id: data.academic_term_id
                  }
            },
            data:{
                professor_id: data.professor_id,
            }
        });
        return InstructionEntity.fromObject(result_created);
    }
    async Get(data: GetInstruction): Promise<InstructionEntity[]> {
        const result = await prisma.instruction.findMany({
            where:{
                
                AND:[
                    {professor_id: data.professor_id,},
                    {subject_id: data.subject_id,},
                    {academic_term_id: data.academic_term_id},
                ],
            },
            include:{
                subject: true,
            }
        });
        const list_results: InstructionEntity[] = result.map((actual)=>{
           const retornar = InstructionEntity.fromObject(actual);
           retornar.subject = actual.subject.description;
            return retornar
        });
        return list_results;
    }
    async Create(data: CreateInstruction): Promise<InstructionEntity> {
        const check_if_exists = await prisma.instruction.findFirst({
            where:{
                subject_id: data.subject_id,
                academic_term_id: data.academic_term_id
            },include:{
                subject:true
            }
        })
        if (check_if_exists == null) throw new Error("instruction does not exists");
        const result_created = await prisma.instruction.update({
            where:{
                subject_id_academic_term_id:{
                    subject_id: data.subject_id,
                    academic_term_id: data.academic_term_id,
                }
            },
            data: {
                professor_id: data.professor_id
            }
        });
        return InstructionEntity.fromObject(result_created);
    }

}