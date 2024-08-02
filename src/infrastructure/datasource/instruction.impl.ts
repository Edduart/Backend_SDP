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
                professor_id: data.professor_id,
                subject_id: data.subject_id,
                academic_term_id: data.academic_term_id
            }
        });
        const list_results: InstructionEntity[] = result.map((actual)=>{
            return InstructionEntity.fromObject(actual);
        });
        return list_results;
    }
    async Create(data: CreateInstruction): Promise<InstructionEntity> {
        const check_if_already_exists = await prisma.instruction.findFirst({
            where:{
                subject_id: data.subject_id,
                academic_term_id: data.academic_term_id
            }
        })
        if (check_if_already_exists != null) throw new Error("Acadenuc Term ya existe");
        const result_created = await prisma.instruction.create({data: data});
        return InstructionEntity.fromObject(result_created);
    }

}